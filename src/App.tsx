import { useMemo, useRef, useState } from "react";
import { ApprovedTasksPanel } from "./components/ApprovedTasksPanel";
import { PromptComposer } from "./components/PromptComposer";
import { SuggestionPreview } from "./components/SuggestionPreview";
import { getRandomSamplePrompt, streamSteps, toTaskSuggestion } from "./lib/mockPlanner";
import { createPlanRequest, requestPlanDraft } from "./lib/plannerAgent";
import { validatePlanResponse } from "./lib/validatePlanResponse";
import { wait } from "./lib/wait";
import type {
  ApprovedTask,
  PlannerIssue,
  PlannerStatus,
  TaskSuggestion,
  TaskSuggestionPatch,
} from "./types/planner";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [status, setStatus] = useState<PlannerStatus>("idle");
  const [streamMessage, setStreamMessage] = useState("");
  const [issue, setIssue] = useState<PlannerIssue | null>(null);
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [approved, setApproved] = useState<ApprovedTask[]>([]);
  const [history, setHistory] = useState<ApprovedTask[][]>([]);
  const runIdRef = useRef("");

  const isGenerating = status === "generating";
  const selectedCount = useMemo(() => suggestions.filter((item) => item.selected).length, [suggestions]);

  async function generateSuggestions(sourcePrompt: string) {
    const trimmed = sourcePrompt.trim();

    if (!trimmed) {
      return;
    }

    const runId = crypto.randomUUID();
    runIdRef.current = runId;
    setLastPrompt(trimmed);
    setStatus("generating");
    setSuggestions([]);
    setIssue(null);
    setStreamMessage("사용자 의도를 AI 요청 계약으로 정리하는 중...");

    await wait(420);

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("AI draft 응답을 요청하는 중...");
    const aiResponse = await requestPlanDraft(createPlanRequest(trimmed));

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("AI 응답이 출력 계약에 맞는지 검증하는 중...");
    await wait(420);

    const validation = validatePlanResponse(aiResponse);

    if (!validation.ok) {
      setStatus("error");
      setStreamMessage("");
      setIssue(createContractIssue(validation.message));
      return;
    }

    const plan = validation.data.tasks.map(toTaskSuggestion);

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
  }

  async function testContractFailure() {
    const runId = crypto.randomUUID();
    runIdRef.current = runId;
    setLastPrompt((current) => current || "계약 실패 테스트");
    setStatus("generating");
    setIssue(null);
    setStreamMessage("깨진 AI draft 응답을 요청하는 중...");
    const aiResponse = await requestPlanDraft(createPlanRequest("계약 실패 테스트"), "contract-failure");

    if (runIdRef.current !== runId) {
      return;
    }

    setStreamMessage("깨진 응답이 출력 계약을 통과하는지 검증하는 중...");
    await wait(420);

    const validation = validatePlanResponse(aiResponse);

    if (!validation.ok) {
      setStatus("error");
      setStreamMessage("");
      setIssue(createContractIssue(validation.message));
      return;
    }
  }

  function updateSuggestion(id: string, patch: TaskSuggestionPatch) {
    setSuggestions((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function applySelectedSuggestions() {
    const selected = suggestions.filter((item) => item.selected);

    if (selected.length === 0) {
      return;
    }

    setHistory((current) => [...current, approved]);
    setApproved((current) => [
      ...current,
      ...selected.map(({ selected: _selected, ...item }) => ({
        ...item,
        id: crypto.randomUUID(),
      })),
    ]);
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
          isGenerating={isGenerating}
          onPromptChange={setPrompt}
          onSample={() => setPrompt(getRandomSamplePrompt())}
          onGenerate={() => generateSuggestions(prompt)}
        />

        <SuggestionPreview
          suggestions={suggestions}
          selectedCount={selectedCount}
          isGenerating={isGenerating}
          streamMessage={streamMessage}
          issue={issue}
          canRegenerate={Boolean(lastPrompt) && !isGenerating}
          onRegenerate={() => generateSuggestions(lastPrompt || prompt)}
          onContractFailureTest={testContractFailure}
          onDismissIssue={() => setIssue(null)}
          onApply={applySelectedSuggestions}
          onSuggestionChange={updateSuggestion}
        />
      </section>

      <ApprovedTasksPanel approved={approved} canUndo={history.length > 0} onUndo={undoApprovedTasks} />
    </main>
  );
}

function createContractIssue(message: string): PlannerIssue {
  return {
    title: "AI 응답을 초안으로 사용할 수 없습니다.",
    message,
    recovery: "응답 계약을 통과하지 못했기 때문에 앱 상태로 반영하지 않았습니다. 다시 생성하거나 요청을 더 구체적으로 바꿔보세요.",
  };
}
