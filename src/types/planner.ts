import type { PlannerPolicyRuleId, PlannerPolicyRuleMetadata } from "./plannerPolicy";

export type PlannerStatus = "idle" | "generating" | "ready" | "error";

export type TaskSuggestion = {
  id: string;
  title: string;
  detail: string;
  day: string;
  duration: string;
  selected: boolean;
};

export type ApprovedTaskSource = {
  kind: "ai-draft";
  prompt: string;
  traceMode: "valid" | "contract-failure" | "duplicate-title" | "unknown";
  approvedAt: string;
};

export type ApprovedTask = Omit<TaskSuggestion, "selected"> & {
  source: ApprovedTaskSource;
};

export type TaskSuggestionPatch = Partial<TaskSuggestion>;

export type PlannerIssue = {
  title: string;
  message: string;
  recovery: string;
  rule?: PlannerPolicyRuleMetadata;
};

export type ApplyGuardResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      ruleId: PlannerPolicyRuleId;
      message: string;
    };
