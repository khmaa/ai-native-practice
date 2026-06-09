export function PromptComposer({
  prompt,
  isGenerating,
  onPromptChange,
  onSample,
  onGenerate,
  onCancel,
}: {
  prompt: string;
  isGenerating: boolean;
  onPromptChange: (prompt: string) => void;
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
