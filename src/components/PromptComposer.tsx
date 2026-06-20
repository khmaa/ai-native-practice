export function PromptComposer({
  prompt,
  feedbackNote,
  isGenerating,
  onPromptChange,
  onFeedbackNoteChange,
  onSample,
  onGenerate,
  onCancel,
}: {
  prompt: string;
  feedbackNote: string;
  isGenerating: boolean;
  onPromptChange: (prompt: string) => void;
  onFeedbackNoteChange: (feedbackNote: string) => void;
  onSample: () => void;
  onGenerate: () => void;
  onCancel: () => void;
}) {
  return (
    <section className="composer" aria-label="planning request">
      <label htmlFor="prompt">Planning request</label>
      <textarea
        id="prompt"
        rows={4}
        value={prompt}
        placeholder="예: 다음 주 발표 준비 일정을 현실적으로 쪼개줘"
        onChange={(event) => onPromptChange(event.target.value)}
      />
      <label htmlFor="feedback-note">Feedback for next generation</label>
      <textarea
        id="feedback-note"
        rows={2}
        maxLength={160}
        value={feedbackNote}
        placeholder="예: 더 작은 작업으로 쪼개고 중복 없이 제안해줘"
        onChange={(event) => onFeedbackNoteChange(event.target.value)}
      />
      <p className="field-help">선택 사항 · 최대 160자 · 다음 AI 요청에만 feedback으로 전달됩니다.</p>
      <p className="field-help">검증 오류 feedback은 같은 planning request를 재생성할 때만 전달됩니다.</p>
      <div className="composer-actions">
        <button className="secondary" type="button" disabled={isGenerating} onClick={onSample}>
          샘플
        </button>
        {isGenerating ? (
          <button className="secondary danger" type="button" onClick={onCancel}>
            취소
          </button>
        ) : (
          <button type="button" onClick={onGenerate}>
            생성
          </button>
        )}
      </div>
    </section>
  );
}
