import { useMemo, useRef, useState } from "react";
import { AgentTracePanel } from "./components/AgentTracePanel";
import { ApprovedTasksPanel } from "./components/ApprovedTasksPanel";
import { PlannerStatePanel } from "./components/PlannerStatePanel";
import { PromptComposer } from "./components/PromptComposer";
import { SuggestionPreview } from "./components/SuggestionPreview";
import { completeTrace, summarizeUnknownResponse } from "./lib/agentTrace";
import { createPlanContext } from "./lib/planContext";
import { getPlannerStateView } from "./lib/plannerState";
import { createPlannerPolicySnapshot, getPlannerPolicyRule } from "./lib/plannerPolicy";
import { getRandomSamplePrompt, streamSteps, toTaskSuggestion } from "./lib/mockPlanner";
import { createPlanRequest, requestPlanDraft } from "./lib/plannerAgent";
import { validateApplySelection } from "./lib/validateApplySelection";
import { validatePlanResponse } from "./lib/validatePlanResponse";
import { wait } from "./lib/wait";
import type { AgentTrace, FeedbackDecision } from "./types/agentTrace";
import type { PlanFeedback, PlanRetryFeedback, PlanValidationResult } from "./types/aiContract";
import type {
  ApprovedTask,
  ApprovedTaskSource,
  PlannerIssue,
  PlannerStatus,
  RecoveryAttempt,
  TaskSuggestion,
  TaskSuggestionPatch,
} from "./types/planner";
import type { PlannerPolicyRuleId } from "./types/plannerPolicy";

const recoverySourceSummaryLimit = 96;
const recoverySourceSummaryReason = "keeps recovery provenance scannable inside the state panel";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [status, setStatus] = useState<PlannerStatus>("idle");
  const [streamMessage, setStreamMessage] = useState("");
  const [issue, setIssue] = useState<PlannerIssue | null>(null);
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [approved, setApproved] = useState<ApprovedTask[]>([]);
  const [history, setHistory] = useState<ApprovedTask[][]>([]);
  const [trace, setTrace] = useState<AgentTrace | null>(null);
  const [retryFeedback, setRetryFeedback] = useState<PlanRetryFeedback | null>(null);
  const [recoveryAttempt, setRecoveryAttempt] = useState<RecoveryAttempt | null>(null);
  const runIdRef = useRef("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const draftBackupRef = useRef<TaskSuggestion[] | null>(null);

  const isGenerating = status === "generating";
  const plannerPolicySnapshot = createPlannerPolicySnapshot();
  const selectedCount = useMemo(() => suggestions.filter((item) => item.selected).length, [suggestions]);
  const plannerStateView = getPlannerStateView({
    status,
    hasDraft: suggestions.length > 0,
    issue,
  });

  async function generateSuggestions(sourcePrompt: string, recovery?: RecoveryAttempt) {
    const trimmed = sourcePrompt.trim();

    if (!trimmed) {
      return;
    }

    const runId = crypto.randomUUID();
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    draftBackupRef.current = suggestions;
    runIdRef.current = runId;
    const planFeedback = createPlanFeedback(retryFeedback, feedbackNote, trimmed);
    const request = createPlanRequest(
      trimmed,
      createPlanContext(approved, suggestions),
      planFeedback.feedback,
    );
    const nextTrace: AgentTrace = {
      request,
      mode: "valid",
      startedAt: Date.now(),
      policyVersion: plannerPolicySnapshot.version,
      policyDescription: plannerPolicySnapshot.description,
      feedbackDecision: planFeedback.decision,
      responseSummary: "pending",
      validationStatus: "pending",
    };

    setTrace(nextTrace);
    setLastPrompt(trimmed);
    setStatus("generating");
    setIssue(null);
    setRecoveryAttempt(recovery ?? null);
    setStreamMessage("사용자 의도를 AI 요청 계약으로 정리하는 중...");

    await wait(420);

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("AI draft 응답을 요청하는 중...");
    const aiResponse = await requestPlanDraft(request, "valid", abortController.signal).catch((error: unknown) => {
      if (isAbortError(error)) {
        setTrace(completeTrace(nextTrace, {
          responseSummary: "request cancelled before response",
          validationStatus: "cancelled",
          validationMessage: "cancelled",
        }));
        return null;
      }

      throw error;
    });

    if (aiResponse === null) {
      if (runIdRef.current === runId) {
        setStatus(suggestions.length > 0 ? "ready" : "idle");
        setStreamMessage("AI 요청을 취소했습니다.");
        await wait(650);

        if (runIdRef.current === runId) {
          setStreamMessage("");
        }
      }

      return;
    }

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("AI 응답이 출력 계약에 맞는지 검증하는 중...");
    await wait(420);

    const validation = validatePlanResponse(aiResponse);
    const responseSummary = summarizeUnknownResponse(aiResponse);

    if (!validation.ok) {
      setTrace(completeTrace(nextTrace, {
        responseSummary,
        validationStatus: "failed",
        validationCategory: validation.category,
        validationRuleId: validation.ruleId,
        validationMessage: validation.message,
      }));
      setStatus("error");
      setStreamMessage("");
      setRetryFeedback(createRetryFeedback(validation, request.prompt));
      if (recovery) {
        setRecoveryAttempt({
          ...recovery,
          status: "failed",
          message: "복구 재생성도 validation을 통과하지 못했습니다. 새 오류의 권장 행동을 다시 확인하세요.",
        });
      }
      setIssue(createValidationIssue(validation));
      return;
    }

    setTrace(completeTrace(nextTrace, {
      responseSummary,
      validationStatus: "passed",
      validationMessage: "passed",
    }));

    const plan = validation.data.tasks.map(toTaskSuggestion);
    setSuggestions([]);

    for (const [index, item] of plan.entries()) {
      if (runIdRef.current !== runId) {
        return;
      }

      setStreamMessage(streamSteps[index] ?? "결과를 정리하는 중...");
      await wait(420);

      if (runIdRef.current !== runId) {
        return;
      }

      setSuggestions((current) => [...current, item]);
    }

    setStreamMessage("검토 가능한 초안이 준비됐습니다.");
    await wait(450);

    if (runIdRef.current !== runId) {
      return;
    }

    setStatus("ready");
    setStreamMessage("");
    setRetryFeedback(null);
    setFeedbackNote("");
    if (recovery) {
      setRecoveryAttempt({
        ...recovery,
        status: "succeeded",
        message: "복구 시도로 새 preview draft가 준비됐습니다. 이제 사용자가 검토하고 적용할 수 있습니다.",
      });
    }
    abortControllerRef.current = null;
    draftBackupRef.current = null;
  }

  async function testContractFailure() {
    const runId = crypto.randomUUID();
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    draftBackupRef.current = suggestions;
    runIdRef.current = runId;
    const request = createPlanRequest(
      "계약 실패 테스트",
      createPlanContext(approved, suggestions),
    );
    const nextTrace: AgentTrace = {
      request,
      mode: "contract-failure",
      startedAt: Date.now(),
      policyVersion: plannerPolicySnapshot.version,
      policyDescription: plannerPolicySnapshot.description,
      responseSummary: "pending",
      validationStatus: "pending",
    };

    setTrace(nextTrace);
    setLastPrompt((current) => current || "계약 실패 테스트");
    setStatus("generating");
    setIssue(null);
    setRecoveryAttempt(null);
    setStreamMessage("깨진 AI draft 응답을 요청하는 중...");
    const aiResponse = await requestPlanDraft(request, "contract-failure", abortController.signal);

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("깨진 응답이 출력 계약을 통과하는지 검증하는 중...");
    await wait(420);

    const validation = validatePlanResponse(aiResponse);
    const responseSummary = summarizeUnknownResponse(aiResponse);

    if (!validation.ok) {
      setTrace(completeTrace(nextTrace, {
        responseSummary,
        validationStatus: "failed",
        validationCategory: validation.category,
        validationRuleId: validation.ruleId,
        validationMessage: validation.message,
      }));
      setStatus("error");
      setStreamMessage("");
      setRetryFeedback(createRetryFeedback(validation, request.prompt));
      setIssue(createValidationIssue(validation));
      return;
    }
  }

  async function testDuplicateTitleResponse() {
    const runId = crypto.randomUUID();
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    draftBackupRef.current = suggestions;
    runIdRef.current = runId;
    const request = createPlanRequest(
      lastPrompt || prompt || "중복 제목 테스트",
      createPlanContext(approved, suggestions),
    );
    const nextTrace: AgentTrace = {
      request,
      mode: "duplicate-title",
      startedAt: Date.now(),
      policyVersion: plannerPolicySnapshot.version,
      policyDescription: plannerPolicySnapshot.description,
      responseSummary: "pending",
      validationStatus: "pending",
    };

    setTrace(nextTrace);
    setLastPrompt((current) => current || request.prompt);
    setStatus("generating");
    setIssue(null);
    setRecoveryAttempt(null);
    setStreamMessage("형식은 맞지만 중복 title이 있는 AI draft 응답을 요청하는 중...");
    const aiResponse = await requestPlanDraft(request, "duplicate-title", abortController.signal);

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("응답 구조뿐 아니라 제품 정책까지 검증하는 중...");
    await wait(420);

    const validation = validatePlanResponse(aiResponse);
    const responseSummary = summarizeUnknownResponse(aiResponse);

    if (!validation.ok) {
      setTrace(completeTrace(nextTrace, {
        responseSummary,
        validationStatus: "failed",
        validationCategory: validation.category,
        validationRuleId: validation.ruleId,
        validationMessage: validation.message,
      }));
      setStatus("error");
      setStreamMessage("");
      setRetryFeedback(createRetryFeedback(validation, request.prompt));
      setIssue(createValidationIssue(validation));
      return;
    }
  }

  async function cancelGeneration() {
    if (!abortControllerRef.current) {
      return;
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = null;
    runIdRef.current = crypto.randomUUID();
    setSuggestions(draftBackupRef.current ?? []);
    setStatus(draftBackupRef.current?.length ? "ready" : "idle");
    draftBackupRef.current = null;
    setRecoveryAttempt((current) =>
      current?.status === "started"
        ? {
            ...current,
            status: "cancelled",
            message: "복구 요청을 취소하고 마지막 유효 초안으로 돌아왔습니다.",
          }
        : current,
    );
    setStreamMessage("AI 요청을 취소하고 마지막 유효 초안으로 돌아왔습니다.");

    await wait(650);
    setStreamMessage("");
  }

  function updateSuggestion(id: string, patch: TaskSuggestionPatch) {
    setSuggestions((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    setRecoveryAttempt((current) =>
      current?.action === "edit-preview" && current.status === "started"
        ? {
            ...current,
            status: "succeeded",
            message: "Preview 수정이 반영됐습니다. 이제 선택 항목 적용을 다시 시도할 수 있습니다.",
          }
        : current,
    );
  }

  function regenerateFromIssue() {
    const recovery = issue
      ? createRecoveryAttempt("regenerate", issue)
      : undefined;

    void generateSuggestions(lastPrompt || prompt, recovery);
  }

  function dismissIssue() {
    if (issue?.recommendedAction === "edit-preview") {
      setRecoveryAttempt(createRecoveryAttempt("edit-preview", issue));
    }

    setIssue(null);
  }

  function applySelectedSuggestions() {
    const selected = suggestions.filter((item) => item.selected);

    if (selected.length === 0) {
      return;
    }

    const applyGuard = validateApplySelection(selected);

    if (!applyGuard.ok) {
      setRecoveryAttempt(null);
      setIssue(createApplyGuardIssue(applyGuard.message, applyGuard.ruleId));
      return;
    }

    const source = createApprovedTaskSource(trace);

    setHistory((current) => [...current, approved]);
    setApproved((current) => [
      ...current,
      ...selected.map(({ selected: _selected, ...item }) => ({
        ...item,
        id: crypto.randomUUID(),
        title: item.title.trim(),
        detail: item.detail.trim(),
        day: item.day.trim(),
        duration: item.duration.trim(),
        source,
      })),
    ]);
    setIssue(null);
    setRecoveryAttempt(null);
    setSuggestions((current) => current.map((item) => ({ ...item, selected: false })));
  }

  function undoApprovedTasks() {
    const previous = history.at(-1);

    if (!previous) {
      return;
    }

    setApproved(previous);
    setHistory((current) => current.slice(0, -1));
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">AI Native Frontend Lab</p>
            <h1>Task Planner</h1>
          </div>
          <div className="status-pill">{isGenerating ? "Generating" : "Mock AI"}</div>
        </header>

        <PromptComposer
          prompt={prompt}
          feedbackNote={feedbackNote}
          policyDescription={plannerPolicySnapshot.description}
          isGenerating={isGenerating}
          onPromptChange={setPrompt}
          onFeedbackNoteChange={setFeedbackNote}
          onSample={() => setPrompt(getRandomSamplePrompt())}
          onGenerate={() => generateSuggestions(prompt)}
          onCancel={cancelGeneration}
        />

        <PlannerStatePanel stateView={plannerStateView} recoveryAttempt={recoveryAttempt} />

        <AgentTracePanel trace={trace} />

        <SuggestionPreview
          suggestions={suggestions}
          selectedCount={selectedCount}
          isGenerating={isGenerating}
          streamMessage={streamMessage}
          issue={issue}
          canRegenerate={Boolean(lastPrompt) && !isGenerating}
          onRegenerate={regenerateFromIssue}
          onContractFailureTest={testContractFailure}
          onDuplicateTitleTest={testDuplicateTitleResponse}
          onDismissIssue={dismissIssue}
          onApply={applySelectedSuggestions}
          onSuggestionChange={updateSuggestion}
        />
      </section>

      <ApprovedTasksPanel approved={approved} canUndo={history.length > 0} onUndo={undoApprovedTasks} />
    </main>
  );
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function createValidationIssue(validation: Extract<PlanValidationResult, { ok: false }>): PlannerIssue {
  const rule = getPlannerPolicyRule(validation.ruleId);
  const ruleGuidance = `${rule.description} Recovery: ${rule.recoveryHint}`;

  if (validation.category === "semantic") {
    return {
      title: "AI 초안이 제품 기준을 통과하지 못했습니다.",
      message: validation.message,
      recovery: `${ruleGuidance} 같은 요청을 다시 생성할 때만 이 실패 이유를 feedback으로 전달합니다.`,
      rule,
      actionHint: "다시 생성해서 정책을 통과하는 AI draft를 요청하세요.",
      recommendedAction: "regenerate",
    };
  }

  return {
    title: "AI 응답 구조가 계약과 다릅니다.",
    message: validation.message,
    recovery: `${ruleGuidance} 응답 계약을 통과하지 못했기 때문에 앱 상태로 반영하지 않았습니다.`,
    rule,
    actionHint: "다시 생성해서 출력 계약을 만족하는 응답을 요청하세요.",
    recommendedAction: "regenerate",
  };
}

function createApplyGuardIssue(message: string, ruleId: PlannerPolicyRuleId): PlannerIssue {
  const rule = getPlannerPolicyRule(ruleId);

  return {
    title: "선택 항목이 적용 기준을 통과하지 못했습니다.",
    message,
    recovery: `Recovery: ${rule.recoveryHint} AI draft를 수정한 뒤에도 Apply 직전에 다시 검사합니다.`,
    rule,
    actionHint: "Preview 값을 고친 뒤 선택 항목 적용을 다시 누르세요.",
    recommendedAction: "edit-preview",
  };
}

function createRecoveryAttempt(action: RecoveryAttempt["action"], issue: PlannerIssue): RecoveryAttempt {
  const sourceIssueSummary = summarizeRecoverySource(issue.message);

  if (action === "edit-preview") {
    return {
      action: "edit-preview",
      status: "started",
      label: "Recovery attempt: edit preview",
      message: "오류를 닫고 preview 값을 직접 수정하는 복구 흐름을 시작했습니다.",
      sourceRuleId: issue.rule?.id,
      sourceIssueTitle: issue.title,
      sourceIssueMessage: issue.message,
      sourceIssueSummary: sourceIssueSummary.text,
      sourceIssueSummaryLimit: sourceIssueSummary.limit,
      sourceIssueSummaryReason: sourceIssueSummary.reason,
      sourceIssueSummaryTruncated: sourceIssueSummary.truncated,
    };
  }

  return {
    action: "regenerate",
    status: "started",
    label: "Recovery attempt: regenerate",
    message: "실패 이유를 feedback으로 포함해 새 AI draft를 요청하는 복구 흐름을 시작했습니다.",
    sourceRuleId: issue.rule?.id,
    sourceIssueTitle: issue.title,
    sourceIssueMessage: issue.message,
    sourceIssueSummary: sourceIssueSummary.text,
    sourceIssueSummaryLimit: sourceIssueSummary.limit,
    sourceIssueSummaryReason: sourceIssueSummary.reason,
    sourceIssueSummaryTruncated: sourceIssueSummary.truncated,
  };
}

function summarizeRecoverySource(message: string) {
  const normalized = message.trim().replace(/\s+/g, " ");

  if (normalized.length <= recoverySourceSummaryLimit) {
    return {
      text: normalized,
      limit: recoverySourceSummaryLimit,
      reason: recoverySourceSummaryReason,
      truncated: false,
    };
  }

  return {
    text: `${normalized.slice(0, recoverySourceSummaryLimit - 3)}...`,
    limit: recoverySourceSummaryLimit,
    reason: recoverySourceSummaryReason,
    truncated: true,
  };
}

function createRetryFeedback(
  validation: Extract<PlanValidationResult, { ok: false }>,
  sourcePrompt: string,
): PlanRetryFeedback {
  return {
    sourcePrompt: normalizePrompt(sourcePrompt),
    feedback: {
      validationCategory: validation.category,
      validationRuleId: validation.ruleId,
      validationMessage: validation.message,
    },
  };
}

function createPlanFeedback(
  retryFeedback: PlanRetryFeedback | null,
  feedbackNote: string,
  prompt: string,
) {
  const trimmedNote = feedbackNote.trim().slice(0, 160);
  const normalizedPrompt = normalizePrompt(prompt);
  const validationFeedback =
    retryFeedback?.sourcePrompt === normalizedPrompt ? retryFeedback.feedback : undefined;
  const validationFeedbackDecision = getValidationFeedbackDecision(retryFeedback, normalizedPrompt);
  const userNoteDecision: FeedbackDecision["userNote"] = trimmedNote ? "included" : "none";

  if (!validationFeedback && !trimmedNote) {
    return {
      feedback: undefined,
      decision: {
        validationFeedback: validationFeedbackDecision,
        userNote: userNoteDecision,
        reason: createFeedbackDecisionReason(validationFeedbackDecision, userNoteDecision),
      },
    };
  }

  return {
    feedback: {
      ...validationFeedback,
      ...(trimmedNote ? { userNote: trimmedNote } : {}),
    } satisfies PlanFeedback,
    decision: {
      validationFeedback: validationFeedbackDecision,
      userNote: userNoteDecision,
      reason: createFeedbackDecisionReason(validationFeedbackDecision, userNoteDecision),
    },
  };
}

function normalizePrompt(prompt: string) {
  return prompt.trim().replace(/\s+/g, " ");
}

function getValidationFeedbackDecision(
  retryFeedback: PlanRetryFeedback | null,
  normalizedPrompt: string,
): FeedbackDecision["validationFeedback"] {
  if (!retryFeedback) {
    return "none";
  }

  return retryFeedback.sourcePrompt === normalizedPrompt ? "included" : "excluded-stale";
}

function createFeedbackDecisionReason(
  validationFeedback: "included" | "excluded-stale" | "none",
  userNote: "included" | "none",
) {
  if (validationFeedback === "included" && userNote === "included") {
    return "same request retry plus explicit user guidance";
  }

  if (validationFeedback === "included") {
    return "same request retry";
  }

  if (validationFeedback === "excluded-stale" && userNote === "included") {
    return "stale validation feedback blocked; user note still applies";
  }

  if (validationFeedback === "excluded-stale") {
    return "stale validation feedback blocked";
  }

  if (userNote === "included") {
    return "explicit user guidance";
  }

  return "no feedback context selected";
}

function createApprovedTaskSource(trace: AgentTrace | null): ApprovedTaskSource {
  return {
    kind: "ai-draft",
    prompt: trace?.request.prompt ?? "unknown request",
    traceMode: trace?.mode ?? "unknown",
    approvedAt: new Date().toISOString(),
  };
}
