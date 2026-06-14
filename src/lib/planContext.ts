import type { PlanContext } from "../types/aiContract";
import type { ApprovedTask, TaskSuggestion } from "../types/planner";

export const taskTitleContextBudget = 5;

export function createPlanContext(
  approved: ApprovedTask[],
  suggestions: TaskSuggestion[],
): PlanContext {
  const seenTitles = new Set<string>();
  const approvedTaskTitles = collectUniqueTitles(approved, seenTitles);
  const draftTaskTitles = collectUniqueTitles(suggestions, seenTitles);
  const candidateCount = approvedTaskTitles.length + draftTaskTitles.length;
  const selectedApprovedTitles = approvedTaskTitles.slice(0, taskTitleContextBudget);
  const remainingBudget = taskTitleContextBudget - selectedApprovedTitles.length;
  const selectedDraftTitles = draftTaskTitles.slice(0, remainingBudget);

  return {
    approvedTaskTitles: selectedApprovedTitles,
    draftTaskTitles: selectedDraftTitles,
    taskTitleBudget: taskTitleContextBudget,
    omittedTaskTitleCount:
      candidateCount - selectedApprovedTitles.length - selectedDraftTitles.length,
  };
}

function collectUniqueTitles(
  tasks: Array<{ title: string }>,
  seenTitles: Set<string>,
) {
  const titles: string[] = [];

  for (const task of tasks) {
    const title = task.title.trim();
    const normalizedTitle = title.toLocaleLowerCase("ko");

    if (!title || seenTitles.has(normalizedTitle)) {
      continue;
    }

    seenTitles.add(normalizedTitle);
    titles.push(title);
  }

  return titles;
}
