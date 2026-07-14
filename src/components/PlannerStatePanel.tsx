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
        <div className="recovery-attempt" aria-live="polite">
          <strong>{recoveryAttempt.label}</strong>
          <span>{recoveryAttempt.message}</span>
          {recoveryAttempt.sourceRuleId ? <small>source rule: {recoveryAttempt.sourceRuleId}</small> : null}
        </div>
      ) : null}
    </section>
  );
}
