import type { PlannerStateView } from "../lib/plannerState";

export function PlannerStatePanel({ stateView }: { stateView: PlannerStateView }) {
  return (
    <section className="state-panel" aria-label="planner state">
      <p className="eyebrow">State Machine</p>
      <div className="state-panel-body">
        <strong>{stateView.label}</strong>
        <span>{stateView.description}</span>
        <small>{stateView.allowedAction}</small>
      </div>
    </section>
  );
}
