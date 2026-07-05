import type { ApplyGuardResult, TaskSuggestion } from "../types/planner";
import type { PlannerPolicyRuleId } from "../types/plannerPolicy";
import { formatAllowedPlanDays, isAllowedPlanDay, isPlanDuration, normalizeTaskTitle } from "./plannerPolicy";

export function validateApplySelection(tasks: TaskSuggestion[]): ApplyGuardResult {
  if (tasks.length === 0) {
    return blocked("selection-required", "적용할 작업을 하나 이상 선택해야 합니다.");
  }

  const seenTitles = new Set<string>();

  for (const [index, task] of tasks.entries()) {
    const taskLabel = `${index + 1}번째 선택 항목`;
    const title = task.title.trim();
    const detail = task.detail.trim();
    const day = task.day.trim();
    const duration = task.duration.trim();

    if (!title) {
      return blocked("required-field", `${taskLabel}의 title은 비어 있을 수 없습니다.`);
    }

    if (!detail) {
      return blocked("required-field", `${taskLabel}의 detail은 비어 있을 수 없습니다.`);
    }

    if (!isAllowedPlanDay(day)) {
      return blocked("allowed-day", `${taskLabel}의 day는 ${formatAllowedPlanDays()} 중 하나여야 합니다.`);
    }

    if (!isPlanDuration(duration)) {
      return blocked("duration-format", `${taskLabel}의 duration은 60m 같은 형식이어야 합니다.`);
    }

    const normalizedTitle = normalizeTaskTitle(title);

    if (seenTitles.has(normalizedTitle)) {
      return blocked("unique-title", `${taskLabel}의 title이 다른 선택 항목과 중복됩니다.`);
    }

    seenTitles.add(normalizedTitle);
  }

  return { ok: true };
}

function blocked(ruleId: PlannerPolicyRuleId, message: string): ApplyGuardResult {
  return {
    ok: false,
    ruleId,
    message,
  };
}
