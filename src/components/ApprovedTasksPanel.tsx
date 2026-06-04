import type { ApprovedTask } from "../types/planner";

export function ApprovedTasksPanel({
  approved,
  canUndo,
  onUndo,
}: {
  approved: ApprovedTask[];
  canUndo: boolean;
  onUndo: () => void;
}) {
  return (
    <aside className="side-panel" aria-label="approved tasks">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">App State</p>
          <h2>Approved tasks</h2>
          <p className="panel-meta">{approved.length} approved</p>
        </div>
        <button className="secondary icon-button" type="button" title="Undo" disabled={!canUndo} onClick={onUndo}>
          ↶
        </button>
      </div>

      {approved.length === 0 ? <div className="empty-state compact">아직 적용된 작업이 없습니다.</div> : null}

      <ol className="approved-list">
        {approved.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <span>
              {item.day} · {item.duration} · {item.detail}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
