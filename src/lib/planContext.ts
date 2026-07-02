import type { PlanContext } from "../types/aiContract";
import type { ApprovedTask, TaskSuggestion } from "../types/planner";
import { normalizeTaskTitle } from "./plannerPolicy";

export const taskTitleContextBudget = 5;

export function createPlanContext(
  approved: ApprovedTask[],
  suggestions: TaskSuggestion[],
): PlanContext {
  const seenTitles = new Set<string>();
  const safetyReport = { blockedTaskTitleCount: 0 };
  const approvedTaskTitles = collectUniqueTitles(approved, seenTitles, safetyReport);
  const draftTaskTitles = collectUniqueTitles(suggestions, seenTitles, safetyReport);
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
    blockedTaskTitleCount: safetyReport.blockedTaskTitleCount,
  };
}

function collectUniqueTitles(
  tasks: Array<{ title: string }>,
  seenTitles: Set<string>,
  safetyReport: { blockedTaskTitleCount: number },
) {
  const titles: string[] = [];

  for (const task of tasks) {
    const title = task.title.trim();
    const normalizedTitle = normalizeTaskTitle(title);

    if (looksLikeInstruction(normalizedTitle)) {
      safetyReport.blockedTaskTitleCount += 1;
      continue;
    }

    if (!title || seenTitles.has(normalizedTitle)) {
      continue;
    }

    seenTitles.add(normalizedTitle);
    titles.push(title);
  }

  return titles;
}

function looksLikeInstruction(title: string) {
  const instructionPatterns = [
    /ignore (all |the )?(previous|prior) instructions?/,
    /reveal (the )?(system prompt|secret|token)/,
    /(이전|위) (지시|명령).*(무시|따르지)/,
    /(시스템 프롬프트|비밀|토큰).*(공개|출력|보여)/,
  ];

  return instructionPatterns.some((pattern) => pattern.test(title));
}
