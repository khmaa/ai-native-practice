import type { PlannerStateView } from "../lib/plannerState";
import type { RecoveryAttempt } from "../types/planner";

export function PlannerStatePanel({
  stateView,
  recoveryAttempt,
}: {
  stateView: PlannerStateView;
  recoveryAttempt: RecoveryAttempt | null;
}) {
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
