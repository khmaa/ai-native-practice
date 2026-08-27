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
          <small>
            contract groups:{" "}
            {policyHealth.contractGroups.map((group) => group.displayText).join(", ")}
          </small>
          <small>contract aggregate: {policyHealth.contractAggregate.presentation.countText}</small>
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
