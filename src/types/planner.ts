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

export type RecoverySourceSummaryContractCheckSummaryStatus = "passing" | "failing";
export type RecoverySourceSummaryContractCheckSummaryPresentationIntent = "state-panel-contract-review";
export type RecoverySourceSummaryContractCheckSummaryPresentationDetailLevel = "compact" | "detailed";
export type RecoverySourceSummaryContractCheckSummaryPresentationAudience = "developer-learner";

export type RecoverySourceSummaryContractCheckSummaryPresentation = {
  intent: RecoverySourceSummaryContractCheckSummaryPresentationIntent;
  intentDescription: string;
  detailLevel: RecoverySourceSummaryContractCheckSummaryPresentationDetailLevel;
  audience: RecoverySourceSummaryContractCheckSummaryPresentationAudience;
  audienceRationale: string;
  metadataText: string;
  countText: string;
  statusText: string;
  diagnosticsText: string;
};

export type RecoverySourceSummaryContractCheckSummaryPresentationMetadataInput = {
  intent: RecoverySourceSummaryContractCheckSummaryPresentationIntent;
  detailLevel: RecoverySourceSummaryContractCheckSummaryPresentationDetailLevel;
  audience: RecoverySourceSummaryContractCheckSummaryPresentationAudience;
};

export type RecoverySourceSummaryContractCheckSummaryPresentationMetadataExample = {
  name: string;
  input: RecoverySourceSummaryContractCheckSummaryPresentationMetadataInput;
  expected: string;
};

export type RecoverySourceSummaryContractCheckSummary = {
  status: RecoverySourceSummaryContractCheckSummaryStatus;
  statusReason: string;
  statusDisplayText: string;
  presentation: RecoverySourceSummaryContractCheckSummaryPresentation;
  total: number;
  passed: number;
  displayText: string;
  diagnostics: string;
};

export type RecoverySourceSummaryContractGroupId =
  | "summary"
  | "guidance-display"
  | "presentation-metadata"
  | "contract-groups-display"
  | "aggregate-coverage-display"
  | "inventory-display"
  | "inventory-safety-display"
  | "review-order-display"
  | "review-order-label"
  | "review-order-scope"
  | "density-display"
  | "density-guidance-display";

export type RecoverySourceSummaryContractGroup = {
  id: RecoverySourceSummaryContractGroupId;
  label: string;
  displayText: string;
  summary: RecoverySourceSummaryContractCheckSummary;
};

export type RecoverySourceSummaryContractDensityLevel = "compact" | "dense";

export type RecoverySourceSummaryContractDensity = {
  level: RecoverySourceSummaryContractDensityLevel;
  groupCount: number;
  displayText: string;
  rationale: string;
};

export type RecoverySourceSummaryContractDensityGuidance = {
  displayText: string;
  message: string;
  rationale: string;
};

export type RecoverySourceSummaryContractDensityGuidanceDisplayInput = {
  displayText: string;
};

export type RecoverySourceSummaryContractDensityGuidanceDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractDensityGuidanceDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryContractDensityDisplayInput = {
  level: RecoverySourceSummaryContractDensityLevel;
  groupCount: number;
};

export type RecoverySourceSummaryContractDensityDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractDensityDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryContractInventory = {
  groupCount: number;
  latestGroupId: RecoverySourceSummaryContractGroupId;
  displayText: string;
  rationale: string;
};

export type RecoverySourceSummaryContractInventorySafetyStatus = "safe" | "empty";

export type RecoverySourceSummaryContractInventorySafety = {
  status: RecoverySourceSummaryContractInventorySafetyStatus;
  displayText: string;
  rationale: string;
};

export type RecoverySourceSummaryContractReviewOrder = {
  groupIds: RecoverySourceSummaryContractGroupId[];
  displayText: string;
  rationaleLabel: string;
  rationaleScope: string;
  rationale: string;
};

export type RecoverySourceSummaryContractReviewOrderDisplayInput = {
  groupIds: RecoverySourceSummaryContractGroupId[];
};

export type RecoverySourceSummaryContractReviewOrderDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractReviewOrderDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryContractReviewOrderLabelInput = {
  label: string;
};

export type RecoverySourceSummaryContractReviewOrderLabelExample = {
  name: string;
  input: RecoverySourceSummaryContractReviewOrderLabelInput;
  expected: string;
};

export type RecoverySourceSummaryContractReviewOrderScopeInput = {
  scope: string;
};

export type RecoverySourceSummaryContractReviewOrderScopeExample = {
  name: string;
  input: RecoverySourceSummaryContractReviewOrderScopeInput;
  expected: string;
};

export type RecoverySourceSummaryContractInventorySafetyDisplayInput = {
  status: RecoverySourceSummaryContractInventorySafetyStatus;
  groupCount: number;
};

export type RecoverySourceSummaryContractInventorySafetyDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractInventorySafetyDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryContractInventoryDisplayInput = {
  groupCount: number;
  latestGroupId: RecoverySourceSummaryContractGroupId;
};

export type RecoverySourceSummaryContractInventoryDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractInventoryDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryContractGroupsDisplayInput = {
  groupDisplayTexts: string[];
};

export type RecoverySourceSummaryContractGroupsDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractGroupsDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryContractAggregateCoverage = {
  groupCount: number;
  displayText: string;
  rationale: string;
};

export type RecoverySourceSummaryContractAggregateCoverageDisplayInput = {
  groupCount: number;
};

export type RecoverySourceSummaryContractAggregateCoverageDisplayExample = {
  name: string;
  input: RecoverySourceSummaryContractAggregateCoverageDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryPolicyHealthStatus = "healthy" | "degraded";
export type RecoverySourceSummaryPolicyHealthGuidanceSeverity = "info" | "warning";
export type RecoverySourceSummaryPolicyHealthGuidanceTone = "calm" | "cautious";

export type RecoverySourceSummaryPolicyHealthGuidance = {
  severity: RecoverySourceSummaryPolicyHealthGuidanceSeverity;
  tone: RecoverySourceSummaryPolicyHealthGuidanceTone;
  label: string;
  displayText: string;
  message: string;
};

export type RecoverySourceSummaryPolicyHealthGuidanceDisplayInput = {
  severity: RecoverySourceSummaryPolicyHealthGuidanceSeverity;
  tone: RecoverySourceSummaryPolicyHealthGuidanceTone;
  label: string;
};

export type RecoverySourceSummaryPolicyHealthGuidanceDisplayExample = {
  name: string;
  input: RecoverySourceSummaryPolicyHealthGuidanceDisplayInput;
  expected: string;
};

export type RecoverySourceSummaryPolicyHealthSnapshot = {
  status: RecoverySourceSummaryPolicyHealthStatus;
  guidance: RecoverySourceSummaryPolicyHealthGuidance;
  guidanceDisplayContract: RecoverySourceSummaryContractCheckSummary;
  presentationMetadataContract: RecoverySourceSummaryContractCheckSummary;
  contractGroups: RecoverySourceSummaryContractGroup[];
  contractDensity: RecoverySourceSummaryContractDensity;
  contractDensityGuidance: RecoverySourceSummaryContractDensityGuidance;
  contractDensityDisplayContract: RecoverySourceSummaryContractCheckSummary;
  contractDensityGuidanceDisplayContract: RecoverySourceSummaryContractCheckSummary;
  contractInventory: RecoverySourceSummaryContractInventory;
  contractInventorySafety: RecoverySourceSummaryContractInventorySafety;
  contractReviewOrder: RecoverySourceSummaryContractReviewOrder;
  contractReviewOrderDisplayContract: RecoverySourceSummaryContractCheckSummary;
  contractReviewOrderLabelContract: RecoverySourceSummaryContractCheckSummary;
  contractReviewOrderScopeContract: RecoverySourceSummaryContractCheckSummary;
  contractInventorySafetyDisplayContract: RecoverySourceSummaryContractCheckSummary;
  contractInventoryDisplayContract: RecoverySourceSummaryContractCheckSummary;
  contractGroupsDisplayText: string;
  contractGroupsDisplayContract: RecoverySourceSummaryContractCheckSummary;
  contractAggregate: RecoverySourceSummaryContractCheckSummary;
  contractAggregateCoverage: RecoverySourceSummaryContractAggregateCoverage;
  contractAggregateCoverageDisplayContract: RecoverySourceSummaryContractCheckSummary;
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
