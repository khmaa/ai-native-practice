import type { ApplyGuardResult, TaskSuggestion } from "../types/planner";

const allowedDays = new Set(["월", "화", "수", "목", "금", "주말"]);

export function validateApplySelection(tasks: TaskSuggestion[]): ApplyGuardResult {
  if (tasks.length === 0) {
    return blocked("적용할 작업을 하나 이상 선택해야 합니다.");
  }

  const seenTitles = new Set<string>();

  for (const [index, task] of tasks.entries()) {
    const taskLabel = `${index + 1}번째 선택 항목`;
    const title = task.title.trim();
    const detail = task.detail.trim();
    const day = task.day.trim();
    const duration = task.duration.trim();

    if (!title) {
      return blocked(`${taskLabel}의 title은 비어 있을 수 없습니다.`);
    }

    if (!detail) {
      return blocked(`${taskLabel}의 detail은 비어 있을 수 없습니다.`);
    }

    if (!allowedDays.has(day)) {
      return blocked(`${taskLabel}의 day는 월/화/수/목/금/주말 중 하나여야 합니다.`);
    }

    if (!/^\d+m$/.test(duration)) {
      return blocked(`${taskLabel}의 duration은 60m 같은 형식이어야 합니다.`);
    }

    const normalizedTitle = title.toLocaleLowerCase("ko");

    if (seenTitles.has(normalizedTitle)) {
      return blocked(`${taskLabel}의 title이 다른 선택 항목과 중복됩니다.`);
    }

    seenTitles.add(normalizedTitle);
  }

  return { ok: true };
}

function blocked(message: string): ApplyGuardResult {
  return {
    ok: false,
    message,
  };
}
