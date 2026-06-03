import { useMemo, useRef, useState } from "react";

type TaskSuggestion = {
  id: string;
  title: string;
  detail: string;
  day: string;
  duration: string;
  selected: boolean;
};

const samples = [
  "다음 주 발표 준비 일정을 현실적으로 쪼개줘",
  "프론트엔드 AI native 개발 공부 계획을 5개 작업으로 만들어줘",
  "부동산 임장 기록 앱 MVP를 만들기 위한 이번 주 작업을 정리해줘",
];

const streamSteps = [
  "작업을 실행 가능한 단위로 쪼개는 중...",
  "각 작업의 일정과 예상 시간을 맞추는 중...",
  "사용자가 검토할 수 있는 카드 형태로 변환하는 중...",
  "기본 선택 항목을 고르는 중...",
  "마지막 작업을 정리하는 중...",
];

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [approved, setApproved] = useState<TaskSuggestion[]>([]);
  const [history, setHistory] = useState<TaskSuggestion[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamMessage, setStreamMessage] = useState("");
  const runIdRef = useRef("");

  const selectedCount = useMemo(
    () => suggestions.filter((item) => item.selected).length,
    [suggestions],
  );

  async function generateSuggestions(sourcePrompt: string) {
    const trimmed = sourcePrompt.trim();

    if (!trimmed) {
      return;
    }

    const runId = crypto.randomUUID();
    const plan = createMockPlan(trimmed);

    runIdRef.current = runId;
    setLastPrompt(trimmed);
    setIsGenerating(true);
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

    setIsGenerating(false);
    setStreamMessage("");
  }

  function updateSuggestion(id: string, patch: Partial<TaskSuggestion>) {
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
      ...selected.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
      })),
    ]);
    setSuggestions((current) =>
      current.map((item) => ({
        ...item,
        selected: false,
      })),
    );
  }

  function undoApprovedTasks() {
    const previous = history.at(-1);

    if (!previous) {
      return;
    }

    setApproved(previous);
    setHistory((current) => current.slice(0, -1));
  }

  function fillSample() {
    const next = samples[Math.floor(Math.random() * samples.length)];
    setPrompt(next);
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

        <section className="composer" aria-label="planning request">
          <label htmlFor="prompt">Planning request</label>
          <textarea
            id="prompt"
            rows={4}
            value={prompt}
            placeholder="예: 다음 주 발표 준비 일정을 현실적으로 쪼개줘"
            onChange={(event) => setPrompt(event.target.value)}
          />
          <div className="composer-actions">
            <button className="secondary" type="button" onClick={fillSample}>
              샘플
            </button>
            <button type="button" disabled={isGenerating} onClick={() => generateSuggestions(prompt)}>
              생성
            </button>
          </div>
        </section>

        <section className="panel" aria-label="ai preview">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Preview</p>
              <h2>AI suggestions</h2>
            </div>
            <button
              className="secondary"
              type="button"
              disabled={!lastPrompt || isGenerating}
              onClick={() => generateSuggestions(lastPrompt || prompt)}
            >
              재생성
            </button>
          </div>

          {isGenerating ? (
            <div className="progress">
              <span />
            </div>
          ) : null}

          {streamMessage ? <div className="stream-status">{streamMessage}</div> : null}

          {suggestions.length === 0 && !isGenerating ? (
            <div className="empty-state">
              요청을 입력하면 적용 전 검토 가능한 작업 카드가 여기에 나타납니다.
            </div>
          ) : null}

          <div className="card-grid">
            {suggestions.map((item) => (
              <TaskCard key={item.id} item={item} onChange={updateSuggestion} />
            ))}
          </div>

          <div className="apply-row">
            <button
              type="button"
              disabled={selectedCount === 0 || isGenerating}
              onClick={applySelectedSuggestions}
            >
              선택 항목 적용
            </button>
          </div>
        </section>
      </section>

      <aside className="side-panel" aria-label="approved tasks">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">App State</p>
            <h2>Approved tasks</h2>
          </div>
          <button
            className="secondary icon-button"
            type="button"
            title="Undo"
            disabled={history.length === 0}
            onClick={undoApprovedTasks}
          >
            ↶
          </button>
        </div>

        {approved.length === 0 ? (
          <div className="empty-state compact">아직 적용된 작업이 없습니다.</div>
        ) : null}

        <ol className="approved-list">
          {approved.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <span>
                {item.day} · {item.duration} · {item.detail}
              </span>
            </li>
          ))}
        </ol>
      </aside>
    </main>
  );
}

function TaskCard({
  item,
  onChange,
}: {
  item: TaskSuggestion;
  onChange: (id: string, patch: Partial<TaskSuggestion>) => void;
}) {
  return (
    <article className={item.selected ? "task-card selected" : "task-card"}>
      <header>
        <input
          type="checkbox"
          checked={item.selected}
          onChange={(event) => onChange(item.id, { selected: event.target.checked })}
        />
        <EditableField
          label="Title"
          value={item.title}
          onChange={(value) => onChange(item.id, { title: value })}
        />
      </header>
      <EditableField
        label="Detail"
        value={item.detail}
        onChange={(value) => onChange(item.id, { detail: value })}
      />
      <EditableField
        label="Day"
        value={item.day}
        onChange={(value) => onChange(item.id, { day: value })}
      />
      <EditableField
        label="Duration"
        value={item.duration}
        onChange={(value) => onChange(item.id, { duration: value })}
      />
    </article>
  );
}

function EditableField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function createMockPlan(prompt: string): TaskSuggestion[] {
  const normalized = prompt.toLowerCase();
  const isStudy = normalized.includes("공부") || normalized.includes("frontend") || normalized.includes("ai native");
  const isPresentation = normalized.includes("발표") || normalized.includes("presentation");
  const isEstate = normalized.includes("부동산") || normalized.includes("임장");

  const base = isStudy
    ? [
        ["AI UX 패턴 조사", "copilot, preview, approve/apply 사례를 정리", "월", "60m"],
        ["Mock structured output 설계", "JSON 형태의 AI 결과를 UI 상태로 바꾸기", "화", "90m"],
        ["편집 가능한 preview 구현", "AI 결과를 카드로 렌더링하고 수정 가능하게 만들기", "수", "120m"],
        ["apply/undo 흐름 구현", "승인된 결과만 실제 앱 상태에 반영", "목", "90m"],
        ["회고 작성", "백엔드 없이 배운 점과 다음 서버리스 과제 정리", "금", "45m"],
      ]
    : isPresentation
      ? [
          ["발표 목표 정리", "청중과 핵심 메시지를 한 문장으로 정의", "월", "45m"],
          ["자료 조사", "근거, 사례, 수치 자료를 수집", "월", "90m"],
          ["슬라이드 초안", "흐름 중심으로 8장 이내 초안 작성", "화", "120m"],
          ["리허설", "시간을 재며 말문 막히는 지점 표시", "목", "60m"],
          ["최종 수정", "시각 자료와 결론 문장 다듬기", "금", "45m"],
        ]
      : isEstate
        ? [
            ["MVP 범위 고정", "임장 기록에서 꼭 필요한 필드만 선택", "월", "60m"],
            ["기록 카드 UI", "주소, 사진, 장단점, 점수 입력 화면 구성", "화", "120m"],
            ["AI 요약 preview", "긴 메모를 요약 카드로 바꾸는 mock 흐름 구현", "수", "90m"],
            ["비교 화면", "여러 매물을 조건별로 스캔할 수 있게 정리", "목", "120m"],
            ["저장 흐름 점검", "localStorage 기반 저장과 삭제 확인", "금", "60m"],
          ]
        : [
            ["요청 해석", "목표와 제약 조건을 짧게 정리", "월", "45m"],
            ["작업 분해", "실행 가능한 작은 단위로 나누기", "화", "75m"],
            ["초안 만들기", "가장 위험한 부분부터 작게 구현", "수", "120m"],
            ["검토와 수정", "결과를 확인하고 빠진 조건 보완", "목", "75m"],
            ["마무리", "다음 액션과 남은 질문 정리", "금", "45m"],
          ];

  return base.map(([title, detail, day, duration], index) => ({
    id: crypto.randomUUID(),
    title,
    detail,
    day,
    duration,
    selected: index < 3,
  }));
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
