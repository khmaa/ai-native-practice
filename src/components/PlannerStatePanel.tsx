import { createRecoverySourceSummaryPolicyHealthSnapshot } from "../lib/recoverySourceSummaryPolicy";
import type { PlannerStateView } from "../lib/plannerState";
import type { RecoveryAttempt } from "../types/planner";

export function PlannerStatePanel({
  stateView,
  recoveryAttempt,
}: {
  stateView: PlannerStateView;
  recoveryAttempt: RecoveryAttempt | null;
}) {
  const policyHealth = createRecoverySourceSummaryPolicyHealthSnapshot();

  return (
    <section className="state-panel" aria-label="planner state">
      <p className="eyebrow">State Machine</p>
      <div className="state-panel-body">
        <strong>{stateView.label}</strong>
        <span>{stateView.description}</span>
        <small>{stateView.allowedAction}</small>
      </div>

      {recoveryAttempt ? (
        <div className={`recovery-attempt ${recoveryAttempt.status}`} aria-live="polite">
          <strong>
            {recoveryAttempt.label} · {summarizeRecoveryStatus(recoveryAttempt.status)}
          </strong>
          <span>{recoveryAttempt.message}</span>
          <small>source issue: {recoveryAttempt.sourceIssueTitle}</small>
          <small>source summary: {recoveryAttempt.sourceIssueSummary}</small>
          <small>
            source display: {recoveryAttempt.sourceIssueSummaryTruncated ? "truncated summary" : "complete summary"}
          </small>
          <small>source policy: {recoveryAttempt.sourceIssueSummaryPolicy.id}</small>
          <small>source budget: {recoveryAttempt.sourceIssueSummaryPolicy.limit} chars</small>
          <small>budget reason: {recoveryAttempt.sourceIssueSummaryPolicy.reason}</small>
          <small>
            policy health: {policyHealth.status} · {policyHealth.policy.id}
          </small>
          <small>presentation metadata: {policyHealth.contractAggregate.presentation.metadataText}</small>
          <small>presentation purpose: {policyHealth.contractAggregate.presentation.intentDescription}</small>
          <small>audience rationale: {policyHealth.contractAggregate.presentation.audienceRationale}</small>
          <small>metadata examples: {policyHealth.presentationMetadataContract.presentation.countText}</small>
          <small>metadata status: {policyHealth.presentationMetadataContract.presentation.statusText}</small>
          <small>metadata diagnostics: {policyHealth.presentationMetadataContract.presentation.diagnosticsText}</small>
          <small>group display examples: {policyHealth.contractGroupsDisplayContract.presentation.countText}</small>
          <small>group display status: {policyHealth.contractGroupsDisplayContract.presentation.statusText}</small>
          <small>
            group display diagnostics: {policyHealth.contractGroupsDisplayContract.presentation.diagnosticsText}
          </small>
          <small>contract groups: {policyHealth.contractGroupsDisplayText}</small>
          <small>contract density: {policyHealth.contractDensity.displayText}</small>
          <small>density rationale: {policyHealth.contractDensity.rationale}</small>
          <small>density guidance: {policyHealth.contractDensityGuidance.displayText}</small>
          <small>density guidance detail: {policyHealth.contractDensityGuidance.message}</small>
          <small>density guidance rationale: {policyHealth.contractDensityGuidance.rationale}</small>
          <small>density guidance set: {policyHealth.contractDensityGuidanceSet.displayText}</small>
          <small>density guidance set status: {policyHealth.contractDensityGuidanceSet.statusDisplayText}</small>
          <small>density guidance set reason: {policyHealth.contractDensityGuidanceSet.statusReasonDisplayText}</small>
          <small>
            density guidance set reason display:{" "}
            {policyHealth.contractDensityGuidanceSet.statusReasonTruncated ? "truncated reason" : "complete reason"}
          </small>
          <small>density guidance set rationale: {policyHealth.contractDensityGuidanceSet.rationale}</small>
          <small>
            density detail examples: {policyHealth.contractDensityGuidanceDetailContract.presentation.countText}
          </small>
          <small>density detail status: {policyHealth.contractDensityGuidanceDetailContract.presentation.statusText}</small>
          <small>
            density detail diagnostics:{" "}
            {policyHealth.contractDensityGuidanceDetailContract.presentation.diagnosticsText}
          </small>
          <small>
            density rationale examples: {policyHealth.contractDensityGuidanceRationaleContract.presentation.countText}
          </small>
          <small>
            density rationale status: {policyHealth.contractDensityGuidanceRationaleContract.presentation.statusText}
          </small>
          <small>
            density rationale diagnostics:{" "}
            {policyHealth.contractDensityGuidanceRationaleContract.presentation.diagnosticsText}
          </small>
          <small>
            density guidance examples: {policyHealth.contractDensityGuidanceDisplayContract.presentation.countText}
          </small>
          <small>density guidance status: {policyHealth.contractDensityGuidanceDisplayContract.presentation.statusText}</small>
          <small>
            density guidance diagnostics:{" "}
            {policyHealth.contractDensityGuidanceDisplayContract.presentation.diagnosticsText}
          </small>
          <small>density examples: {policyHealth.contractDensityDisplayContract.presentation.countText}</small>
          <small>density status: {policyHealth.contractDensityDisplayContract.presentation.statusText}</small>
          <small>density diagnostics: {policyHealth.contractDensityDisplayContract.presentation.diagnosticsText}</small>
          <small>review order: {policyHealth.contractReviewOrder.displayText}</small>
          <small>review order label: {policyHealth.contractReviewOrder.rationaleLabel}</small>
          <small>review order scope: {policyHealth.contractReviewOrder.rationaleScope}</small>
          <small>review order rationale: {policyHealth.contractReviewOrder.rationale}</small>
          <small>review label examples: {policyHealth.contractReviewOrderLabelContract.presentation.countText}</small>
          <small>review label status: {policyHealth.contractReviewOrderLabelContract.presentation.statusText}</small>
          <small>review label diagnostics: {policyHealth.contractReviewOrderLabelContract.presentation.diagnosticsText}</small>
          <small>review scope examples: {policyHealth.contractReviewOrderScopeContract.presentation.countText}</small>
          <small>review scope status: {policyHealth.contractReviewOrderScopeContract.presentation.statusText}</small>
          <small>review scope diagnostics: {policyHealth.contractReviewOrderScopeContract.presentation.diagnosticsText}</small>
          <small>
            review order examples: {policyHealth.contractReviewOrderDisplayContract.presentation.countText}
          </small>
          <small>review order status: {policyHealth.contractReviewOrderDisplayContract.presentation.statusText}</small>
          <small>
            review order diagnostics: {policyHealth.contractReviewOrderDisplayContract.presentation.diagnosticsText}
          </small>
          <small>inventory safety: {policyHealth.contractInventorySafety.displayText}</small>
          <small>inventory safety rationale: {policyHealth.contractInventorySafety.rationale}</small>
          <small>
            safety display examples: {policyHealth.contractInventorySafetyDisplayContract.presentation.countText}
          </small>
          <small>safety display status: {policyHealth.contractInventorySafetyDisplayContract.presentation.statusText}</small>
          <small>
            safety display diagnostics:{" "}
            {policyHealth.contractInventorySafetyDisplayContract.presentation.diagnosticsText}
          </small>
          <small>contract inventory: {policyHealth.contractInventory.displayText}</small>
          <small>inventory rationale: {policyHealth.contractInventory.rationale}</small>
          <small>inventory display examples: {policyHealth.contractInventoryDisplayContract.presentation.countText}</small>
          <small>inventory display status: {policyHealth.contractInventoryDisplayContract.presentation.statusText}</small>
          <small>
            inventory display diagnostics: {policyHealth.contractInventoryDisplayContract.presentation.diagnosticsText}
          </small>
          <small>contract aggregate: {policyHealth.contractAggregate.presentation.countText}</small>
          <small>aggregate coverage: {policyHealth.contractAggregateCoverage.displayText}</small>
          <small>coverage rationale: {policyHealth.contractAggregateCoverage.rationale}</small>
          <small>
            coverage display examples: {policyHealth.contractAggregateCoverageDisplayContract.presentation.countText}
          </small>
          <small>coverage display status: {policyHealth.contractAggregateCoverageDisplayContract.presentation.statusText}</small>
          <small>
            coverage display diagnostics:{" "}
            {policyHealth.contractAggregateCoverageDisplayContract.presentation.diagnosticsText}
          </small>
          <small>aggregate status: {policyHealth.contractAggregate.presentation.statusText}</small>
          <small>aggregate diagnostics: {policyHealth.contractAggregate.presentation.diagnosticsText}</small>
          <small>policy guidance: {policyHealth.guidance.displayText}</small>
          <small>guidance detail: {policyHealth.guidance.message}</small>
          <small>guidance display examples: {policyHealth.guidanceDisplayContract.presentation.countText}</small>
          <small>guidance display status: {policyHealth.guidanceDisplayContract.presentation.statusText}</small>
          <small>
            guidance display diagnostics: {policyHealth.guidanceDisplayContract.presentation.diagnosticsText}
          </small>
          <small>policy examples: {policyHealth.contract.presentation.countText}</small>
          <small>policy examples status: {policyHealth.contract.presentation.statusText}</small>
          <small>policy diagnostics: {policyHealth.contract.presentation.diagnosticsText}</small>
          {recoveryAttempt.sourceRuleId ? <small>source rule: {recoveryAttempt.sourceRuleId}</small> : null}
        </div>
      ) : null}
    </section>
  );
}

function summarizeRecoveryStatus(status: RecoveryAttempt["status"]) {
  if (status === "started") {
    return "started";
  }

  if (status === "succeeded") {
    return "succeeded";
  }

  if (status === "failed") {
    return "failed";
  }

  return "cancelled";
}
