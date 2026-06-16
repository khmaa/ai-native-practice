import type { PlanContext, PlanResponse, PlanTaskDraft } from "../types/aiContract";

export const samplePrompts = [
  "다음 주 발표 준비 일정을 현실적으로 쪼개줘",
  "프론트엔드 AI native 개발 공부 계획을 5개 작업으로 만들어줘",
  "부동산 임장 기록 앱 MVP를 만들기 위한 이번 주 작업을 정리해줘",
];

export const streamSteps = [
  "작업을 실행 가능한 단위로 쪼개는 중...",
  "각 작업의 일정과 예상 시간을 맞추는 중...",
  "사용자가 검토할 수 있는 카드 형태로 변환하는 중...",
  "기본 선택 항목을 고르는 중...",
  "마지막 작업을 정리하는 중...",
];

export function createMockPlanResponse(prompt: string, context: PlanContext): unknown {
  return {
    tasks: applyPlanContext(getTaskSeeds(prompt), context).map(([title, detail, day, duration]) => ({
      title,
      detail,
      day,
      duration,
    })),
  } satisfies PlanResponse;
}

export function createBrokenPlanResponse(): unknown {
  return {
    tasks: "좋아요, 제가 알아서 이번 주 계획을 멋지게 정리해볼게요.",
  };
}

export function createDuplicateTitlePlanResponse(prompt: string, context: PlanContext): unknown {
  const tasks = applyPlanContext(getTaskSeeds(prompt), context);
  const duplicateTitle = tasks[0]?.[0] ?? "중복 작업";

  return {
    tasks: tasks.map(([title, detail, day, duration], index) => ({
      title: index === 1 ? duplicateTitle : title,
      detail,
      day,
      duration,
    })),
  } satisfies PlanResponse;
}

export function toTaskSuggestion({ title, detail, day, duration }: PlanTaskDraft, index: number) {
  return {
    id: crypto.randomUUID(),
    title,
    detail,
    day,
    duration,
    selected: index < 3,
  };
}

export function getRandomSamplePrompt() {
  return samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
}

function applyPlanContext(
  seeds: [title: string, detail: string, day: string, duration: string][],
  context: PlanContext,
) {
  const existingTitles = new Set([
    ...context.approvedTaskTitles.map(normalizeTitle),
    ...context.draftTaskTitles.map(normalizeTitle),
  ]);

  return seeds.map(([title, detail, day, duration]) => {
    if (!existingTitles.has(normalizeTitle(title))) {
      return [title, detail, day, duration] as const;
    }

    return [
      `${title} 보완`,
      `기존 \"${title}\" 작업과 겹치지 않도록 다음 단계와 빠진 조건을 정리`,
      day,
      duration,
    ] as const;
  });
}

function normalizeTitle(title: string) {
  return title.trim().toLocaleLowerCase("ko");
}

function getTaskSeeds(prompt: string): [title: string, detail: string, day: string, duration: string][] {
  const normalized = prompt.toLowerCase();
  const isStudy = normalized.includes("공부") || normalized.includes("frontend") || normalized.includes("ai native");
  const isPresentation = normalized.includes("발표") || normalized.includes("presentation");
  const isEstate = normalized.includes("부동산") || normalized.includes("임장");

  if (isStudy) {
    return [
      ["AI UX 패턴 조사", "copilot, preview, approve/apply 사례를 정리", "월", "60m"],
      ["Mock structured output 설계", "JSON 형태의 AI 결과를 UI 상태로 바꾸기", "화", "90m"],
      ["편집 가능한 preview 구현", "AI 결과를 카드로 렌더링하고 수정 가능하게 만들기", "수", "120m"],
      ["apply/undo 흐름 구현", "승인된 결과만 실제 앱 상태에 반영", "목", "90m"],
      ["회고 작성", "백엔드 없이 배운 점과 다음 서버리스 과제 정리", "금", "45m"],
    ];
  }

  if (isPresentation) {
    return [
      ["발표 목표 정리", "청중과 핵심 메시지를 한 문장으로 정의", "월", "45m"],
      ["자료 조사", "근거, 사례, 수치 자료를 수집", "월", "90m"],
      ["슬라이드 초안", "흐름 중심으로 8장 이내 초안 작성", "화", "120m"],
      ["리허설", "시간을 재며 말문 막히는 지점 표시", "목", "60m"],
      ["최종 수정", "시각 자료와 결론 문장 다듬기", "금", "45m"],
    ];
  }

  if (isEstate) {
    return [
      ["MVP 범위 고정", "임장 기록에서 꼭 필요한 필드만 선택", "월", "60m"],
      ["기록 카드 UI", "주소, 사진, 장단점, 점수 입력 화면 구성", "화", "120m"],
      ["AI 요약 preview", "긴 메모를 요약 카드로 바꾸는 mock 흐름 구현", "수", "90m"],
      ["비교 화면", "여러 매물을 조건별로 스캔할 수 있게 정리", "목", "120m"],
      ["저장 흐름 점검", "localStorage 기반 저장과 삭제 확인", "금", "60m"],
    ];
  }

  return [
    ["요청 해석", "목표와 제약 조건을 짧게 정리", "월", "45m"],
    ["작업 분해", "실행 가능한 작은 단위로 나누기", "화", "75m"],
    ["초안 만들기", "가장 위험한 부분부터 작게 구현", "수", "120m"],
    ["검토와 수정", "결과를 확인하고 빠진 조건 보완", "목", "75m"],
    ["마무리", "다음 액션과 남은 질문 정리", "금", "45m"],
  ];
}
