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
          <small>
            policy guidance: {policyHealth.guidance.severity} · {policyHealth.guidance.label}
          </small>
          <small>guidance detail: {policyHealth.guidance.message}</small>
          <small>
            policy examples: {policyHealth.contract.passed}/{policyHealth.contract.total} passing
          </small>
          <small>policy diagnostics: {policyHealth.contract.diagnostics}</small>
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
