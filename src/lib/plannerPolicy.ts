import type { PlannerPolicyRuleId, PlannerPolicyRuleMetadata } from "../types/plannerPolicy";

export const allowedPlanDays = ["월", "화", "수", "목", "금", "주말"] as const;
export const plannerPolicyVersion = "planner-policy-v1";

export const plannerPolicyRules: Record<PlannerPolicyRuleId, PlannerPolicyRuleMetadata> = {
  "selection-required": {
    id: "selection-required",
    label: "Selection required",
    description: "At least one preview task must be selected before apply.",
    recoveryHint: "Select one or more task cards before applying.",
  },
  "task-count": {
    id: "task-count",
    label: "Task count",
    description: "AI drafts must include 3 to 5 tasks.",
    recoveryHint: "Regenerate the draft or ask for a plan with 3 to 5 tasks.",
  },
  "required-field": {
    id: "required-field",
    label: "Required field",
    description: "Each task needs non-empty title, detail, day, and duration fields.",
    recoveryHint: "Fill in the empty field before retrying.",
  },
  "allowed-day": {
    id: "allowed-day",
    label: "Allowed day",
    description: `Day must be one of ${formatAllowedPlanDays()}.`,
    recoveryHint: "Use one of the allowed day values.",
  },
  "duration-format": {
    id: "duration-format",
    label: "Duration format",
    description: "Duration must be written as minutes ending with m, like 60m.",
    recoveryHint: "Rewrite the duration using the 60m format.",
  },
  "unique-title": {
    id: "unique-title",
    label: "Unique title",
    description: "Selected or generated task titles must be unique after trim and ko lowercase normalization.",
    recoveryHint: "Rename the duplicated task title before retrying.",
  },
};

const allowedPlanDaySet = new Set<string>(allowedPlanDays);

export function isAllowedPlanDay(day: string) {
  return allowedPlanDaySet.has(day);
}

export function formatAllowedPlanDays() {
  return allowedPlanDays.join("/");
}

export function isPlanDuration(duration: string) {
  return /^\d+m$/.test(duration);
}

export function normalizeTaskTitle(title: string) {
  return title.trim().toLocaleLowerCase("ko");
}

export function describePlannerPolicy() {
  return [
    `version: ${plannerPolicyVersion}`,
    `day: ${formatAllowedPlanDays()}`,
    "duration: minutes ending with m, like 60m",
    "title: unique after trim + ko lowercase",
  ].join(" · ");
}

export function createPlannerPolicySnapshot() {
  return {
    version: plannerPolicyVersion,
    description: describePlannerPolicy(),
  };
}

export function getPlannerPolicyRule(ruleId: PlannerPolicyRuleId) {
  return plannerPolicyRules[ruleId];
}
