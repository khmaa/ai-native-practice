import type { PlannerIssue, TaskSuggestion, TaskSuggestionPatch } from "../types/planner";
import { TaskCard } from "./TaskCard";

export function SuggestionPreview({
  suggestions,
  selectedCount,
  isGenerating,
  streamMessage,
  issue,
  canRegenerate,
  onRegenerate,
  onContractFailureTest,
  onDismissIssue,
  onApply,
  onSuggestionChange,
}: {
  suggestions: TaskSuggestion[];
  selectedCount: number;
  isGenerating: boolean;
  streamMessage: string;
  issue: PlannerIssue | null;
  canRegenerate: boolean;
  onRegenerate: () => void;
  onContractFailureTest: () => void;
  onDismissIssue: () => void;
  onApply: () => void;
  onSuggestionChange: (id: string, patch: TaskSuggestionPatch) => void;
}) {
  return (
    <section className="panel" aria-label="ai preview">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Preview</p>
          <h2>AI suggestions</h2>
        </div>
        <div className="panel-actions">
          <button className="secondary" type="button" disabled={isGenerating} onClick={onContractFailureTest}>
            계약 실패 테스트
          </button>
          <button className="secondary" type="button" disabled={!canRegenerate} onClick={onRegenerate}>
            재생성
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="progress">
          <span />
        </div>
      ) : null}

      {streamMessage ? <div className="stream-status">{streamMessage}</div> : null}

      {issue ? (
        <div className="error-state">
          <strong>{issue.title}</strong>
          <span>{issue.message}</span>
          <p>{issue.recovery}</p>
          <div className="error-actions">
            <button className="secondary" type="button" disabled={!canRegenerate} onClick={onRegenerate}>
              다시 생성
            </button>
            <button className="secondary" type="button" onClick={onDismissIssue}>
              닫기
            </button>
          </div>
        </div>
      ) : null}

      {suggestions.length === 0 && !isGenerating ? (
        <div className="empty-state">요청을 입력하면 적용 전 검토 가능한 작업 카드가 여기에 나타납니다.</div>
      ) : null}

      <div className="card-grid">
        {suggestions.map((item) => (
          <TaskCard key={item.id} item={item} onChange={onSuggestionChange} />
        ))}
      </div>

      <div className="apply-row">
        <span className="selection-count">{selectedCount} selected</span>
        <button type="button" disabled={selectedCount === 0 || isGenerating} onClick={onApply}>
          선택 항목 적용
        </button>
      </div>
    </section>
  );
}
