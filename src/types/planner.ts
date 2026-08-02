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

export type RecoveryAction = "regenerate" | "edit-preview";
export type RecoveryAttemptStatus = "started" | "succeeded" | "failed" | "cancelled";

export type RecoverySourceSummaryPolicySnapshot = {
  id: string;
  limit: number;
  reason: string;
};

export type RecoverySourceSummaryResult = {
  text: string;
  policy: RecoverySourceSummaryPolicySnapshot;
  truncated: boolean;
};

export type RecoverySourceSummaryContractExample = {
  name: string;
  input: string;
  expected: RecoverySourceSummaryResult;
};

export type RecoverySourceSummaryContractCheck = {
  name: string;
  passed: boolean;
  mismatchedFields: string[];
};

export type RecoverySourceSummaryContractCheckSummary = {
  total: number;
  passed: number;
  diagnostics: string;
};

export type RecoverySourceSummaryPolicyHealthSnapshot = {
  policy: RecoverySourceSummaryPolicySnapshot;
  contract: RecoverySourceSummaryContractCheckSummary;
};

export type PlannerIssue = {
  title: string;
  message: string;
  recovery: string;
  rule?: PlannerPolicyRuleMetadata;
  actionHint?: string;
  recommendedAction?: RecoveryAction;
};

export type RecoveryAttempt = {
  action: RecoveryAction;
  status: RecoveryAttemptStatus;
  label: string;
  message: string;
  sourceRuleId?: PlannerPolicyRuleId;
  sourceIssueTitle: string;
  sourceIssueMessage: string;
  sourceIssueSummary: string;
  sourceIssueSummaryPolicy: RecoverySourceSummaryPolicySnapshot;
  sourceIssueSummaryTruncated: boolean;
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
