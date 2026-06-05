import { useMemo, useRef, useState } from "react";
import { ApprovedTasksPanel } from "./components/ApprovedTasksPanel";
import { PromptComposer } from "./components/PromptComposer";
import { SuggestionPreview } from "./components/SuggestionPreview";
import {
  createBrokenPlanResponse,
  createMockPlanResponse,
  getRandomSamplePrompt,
  streamSteps,
  toTaskSuggestion,
} from "./lib/mockPlanner";
import { validatePlanResponse } from "./lib/validatePlanResponse";
import { wait } from "./lib/wait";
import type { ApprovedTask, PlannerStatus, TaskSuggestion, TaskSuggestionPatch } from "./types/planner";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [status, setStatus] = useState<PlannerStatus>("idle");
  const [streamMessage, setStreamMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    const aiResponse = createMockPlanResponse(trimmed);

    runIdRef.current = runId;
    setLastPrompt(trimmed);
    setStatus("generating");
    setSuggestions([]);
    setErrorMessage("");
    setStreamMessage("요청의 목표와 제약을 읽는 중...");

    await wait(420);

    setStreamMessage("AI 응답이 계약에 맞는지 검증하는 중...");
    await wait(420);

    if (runIdRef.current !== runId) {
      return;
    }

    const validation = validatePlanResponse(aiResponse);

    if (!validation.ok) {
      setStatus("error");
      setStreamMessage("");
      setErrorMessage(validation.message);
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
    setSuggestions([]);
    setErrorMessage("");
    setStreamMessage("깨진 AI 응답을 검증하는 중...");

    await wait(650);

    if (runIdRef.current !== runId) {
      return;
    }

    const validation = validatePlanResponse(createBrokenPlanResponse());

    if (!validation.ok) {
      setStatus("error");
      setStreamMessage("");
      setErrorMessage(validation.message);
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
          errorMessage={errorMessage}
          canRegenerate={Boolean(lastPrompt) && !isGenerating}
          onRegenerate={() => generateSuggestions(lastPrompt || prompt)}
          onContractFailureTest={testContractFailure}
          onApply={applySelectedSuggestions}
          onSuggestionChange={updateSuggestion}
        />
      </section>

      <ApprovedTasksPanel approved={approved} canUndo={history.length > 0} onUndo={undoApprovedTasks} />
    </main>
  );
}
