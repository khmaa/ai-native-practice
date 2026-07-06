export type PlannerPolicyRuleId =
  | "selection-required"
  | "task-count"
  | "required-field"
  | "allowed-day"
  | "duration-format"
  | "unique-title";

export type PlannerPolicyRuleMetadata = {
  id: PlannerPolicyRuleId;
  label: string;
  description: string;
  recoveryHint: string;
};
