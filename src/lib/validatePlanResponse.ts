import type { PlanResponse, PlanTaskDraft, PlanValidationResult } from "../types/aiContract";

const allowedDays = new Set(["월", "화", "수", "목", "금", "주말"]);

export function validatePlanResponse(response: unknown): PlanValidationResult {
  if (!isRecord(response)) {
    return invalid("AI 응답은 객체여야 합니다.");
  }

  if (!Array.isArray(response.tasks)) {
    return invalid("AI 응답에는 tasks 배열이 필요합니다.");
  }

  if (response.tasks.length < 3 || response.tasks.length > 5) {
    return invalid("tasks는 3개 이상 5개 이하여야 합니다.");
  }

  const tasks: PlanTaskDraft[] = [];

  for (const [index, task] of response.tasks.entries()) {
    if (!isRecord(task)) {
      return invalid(`${index + 1}번째 task는 객체여야 합니다.`);
    }

    const title = readRequiredString(task, "title", index);
    const detail = readRequiredString(task, "detail", index);
    const day = readRequiredString(task, "day", index);
    const duration = readRequiredString(task, "duration", index);

    if (!title.ok) return title;
    if (!detail.ok) return detail;
    if (!day.ok) return day;
    if (!duration.ok) return duration;

    if (!allowedDays.has(day.value)) {
      return invalid(`${index + 1}번째 task의 day는 월/화/수/목/금/주말 중 하나여야 합니다.`);
    }

    if (!/^\d+m$/.test(duration.value)) {
      return invalid(`${index + 1}번째 task의 duration은 60m 같은 형식이어야 합니다.`);
    }

    tasks.push({
      title: title.value,
      detail: detail.value,
      day: day.value,
      duration: duration.value,
    });
  }

  return {
    ok: true,
    data: { tasks },
  };
}

function readRequiredString(
  task: Record<string, unknown>,
  key: keyof PlanTaskDraft,
  index: number,
):
  | {
      ok: true;
      value: string;
    }
  | {
      ok: false;
      message: string;
    } {
  const value = task[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    return invalid(`${index + 1}번째 task의 ${key}는 비어 있지 않은 문자열이어야 합니다.`);
  }

  return {
    ok: true,
    value: value.trim(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invalid(message: string) {
  return {
    ok: false,
    message,
  } as const;
}
