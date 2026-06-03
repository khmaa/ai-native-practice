const state = {
  suggestions: [],
  approved: [],
  history: [],
  lastPrompt: "",
};

const promptInput = document.querySelector("#prompt");
const generateButton = document.querySelector("#generateButton");
const sampleButton = document.querySelector("#sampleButton");
const regenerateButton = document.querySelector("#regenerateButton");
const applyButton = document.querySelector("#applyButton");
const undoButton = document.querySelector("#undoButton");
const progress = document.querySelector("#progress");
const previewEmpty = document.querySelector("#previewEmpty");
const approvedEmpty = document.querySelector("#approvedEmpty");
const suggestionList = document.querySelector("#suggestionList");
const approvedList = document.querySelector("#approvedList");
const statusPill = document.querySelector("#statusPill");

const samples = [
  "다음 주 발표 준비 일정을 현실적으로 쪼개줘",
  "프론트엔드 AI native 개발 공부 계획을 5개 작업으로 만들어줘",
  "부동산 임장 기록 앱 MVP를 만들기 위한 이번 주 작업을 정리해줘",
];

sampleButton.addEventListener("click", () => {
  const next = samples[Math.floor(Math.random() * samples.length)];
  promptInput.value = next;
  promptInput.focus();
});

generateButton.addEventListener("click", () => generateSuggestions(promptInput.value));
regenerateButton.addEventListener("click", () => generateSuggestions(state.lastPrompt || promptInput.value));
applyButton.addEventListener("click", applySelectedSuggestions);
undoButton.addEventListener("click", undoApprovedTasks);

async function generateSuggestions(prompt) {
  const trimmed = prompt.trim();

  if (!trimmed) {
    promptInput.focus();
    return;
  }

  state.lastPrompt = trimmed;
  setBusy(true);
  state.suggestions = [];
  render();

  await wait(850);

  state.suggestions = createMockPlan(trimmed);
  setBusy(false);
  render();
}

function createMockPlan(prompt) {
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

function applySelectedSuggestions() {
  const selected = state.suggestions.filter((item) => item.selected);

  if (selected.length === 0) {
    return;
  }

  state.history.push([...state.approved]);
  state.approved = [
    ...state.approved,
    ...selected.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    })),
  ];

  state.suggestions = state.suggestions.map((item) => ({
    ...item,
    selected: false,
  }));

  render();
}

function undoApprovedTasks() {
  const previous = state.history.pop();

  if (!previous) {
    return;
  }

  state.approved = previous;
  render();
}

function setBusy(isBusy) {
  generateButton.disabled = isBusy;
  regenerateButton.disabled = isBusy || !state.lastPrompt;
  statusPill.textContent = isBusy ? "Generating" : "Mock AI";
  progress.hidden = !isBusy;
}

function render() {
  renderSuggestions();
  renderApproved();

  const selectedCount = state.suggestions.filter((item) => item.selected).length;
  previewEmpty.hidden = state.suggestions.length > 0;
  applyButton.disabled = selectedCount === 0;
  regenerateButton.disabled = !state.lastPrompt || generateButton.disabled;
  undoButton.disabled = state.history.length === 0;
}

function renderSuggestions() {
  suggestionList.replaceChildren(
    ...state.suggestions.map((item) => {
      const card = document.createElement("article");
      card.className = item.selected ? "task-card selected" : "task-card";

      const header = document.createElement("header");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.selected;
      checkbox.addEventListener("change", () => {
        item.selected = checkbox.checked;
        render();
      });

      const titleField = createField("Title", item.title, (value) => {
        item.title = value;
      });

      header.append(checkbox, titleField);
      card.append(
        header,
        createField("Detail", item.detail, (value) => {
          item.detail = value;
        }),
        createField("Day", item.day, (value) => {
          item.day = value;
        }),
        createField("Duration", item.duration, (value) => {
          item.duration = value;
        }),
      );

      return card;
    }),
  );
}

function createField(label, value, onInput) {
  const wrapper = document.createElement("label");
  wrapper.className = "field";

  const labelText = document.createElement("span");
  labelText.textContent = label;

  const input = document.createElement("input");
  input.value = value;
  input.addEventListener("input", () => onInput(input.value));

  wrapper.append(labelText, input);
  return wrapper;
}

function renderApproved() {
  approvedEmpty.hidden = state.approved.length > 0;
  approvedList.replaceChildren(
    ...state.approved.map((item) => {
      const row = document.createElement("li");
      const title = document.createElement("strong");
      const meta = document.createElement("span");

      title.textContent = item.title;
      meta.textContent = `${item.day} · ${item.duration} · ${item.detail}`;
      row.append(title, meta);

      return row;
    }),
  );
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

render();
