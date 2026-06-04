import { useMemo, useRef, useState } from "react";
import { ApprovedTasksPanel } from "./components/ApprovedTasksPanel";
import { PromptComposer } from "./components/PromptComposer";
import { SuggestionPreview } from "./components/SuggestionPreview";
import { createMockPlan, getRandomSamplePrompt, streamSteps } from "./lib/mockPlanner";
import { wait } from "./lib/wait";
import type { ApprovedTask, PlannerStatus, TaskSuggestion, TaskSuggestionPatch } from "./types/planner";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [status, setStatus] = useState<PlannerStatus>("idle");
  const [streamMessage, setStreamMessage] = useState("");
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
    const plan = createMockPlan(trimmed);

    runIdRef.current = runId;
    setLastPrompt(trimmed);
    setStatus("generating");
    setSuggestions([]);
    setStreamMessage("요청의 목표와 제약을 읽는 중...");

    await wait(420);

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
          canRegenerate={Boolean(lastPrompt) && !isGenerating}
          onRegenerate={() => generateSuggestions(lastPrompt || prompt)}
          onApply={applySelectedSuggestions}
          onSuggestionChange={updateSuggestion}
        />
      </section>

      <ApprovedTasksPanel approved={approved} canUndo={history.length > 0} onUndo={undoApprovedTasks} />
    </main>
  );
}
