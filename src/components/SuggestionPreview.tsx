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
  onDuplicateTitleTest,
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
  onDuplicateTitleTest: () => void;
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
          <button className="secondary" type="button" disabled={isGenerating} onClick={onDuplicateTitleTest}>
            중복 응답 테스트
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
          {issue.rule ? (
            <small>
              Policy rule: {issue.rule.id} · {issue.rule.label}
            </small>
          ) : null}
          <p>{issue.recovery}</p>
          {issue.actionHint ? <em>{issue.actionHint}</em> : null}
          {issue.recommendedAction ? (
            <small>Recommended action: {summarizeRecommendedAction(issue.recommendedAction)}</small>
          ) : null}
          <div className="error-actions">
            <button
              className={issue.recommendedAction === "regenerate" ? "secondary recommended" : "secondary"}
              type="button"
              disabled={!canRegenerate}
              onClick={onRegenerate}
            >
              {issue.recommendedAction === "regenerate" ? "권장: 다시 생성" : "다시 생성"}
            </button>
            <button className="secondary" type="button" onClick={onDismissIssue}>
              {issue.recommendedAction === "edit-preview" ? "Preview 수정하기" : "닫기"}
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
        <span className="selection-count">
          {selectedCount} selected · apply guard checks edited values
        </span>
        <button type="button" disabled={selectedCount === 0 || isGenerating} onClick={onApply}>
          선택 항목 적용
        </button>
      </div>
    </section>
  );
}

function summarizeRecommendedAction(action: NonNullable<PlannerIssue["recommendedAction"]>) {
  if (action === "regenerate") {
    return "use the regenerate button";
  }

  return "edit the preview cards, then apply again";
}
