import type { AgentTrace } from "../types/agentTrace";

export function AgentTracePanel({ trace }: { trace: AgentTrace | null }) {
  return (
    <section className="trace-panel" aria-label="agent trace">
      <div className="panel-heading compact-heading">
        <div>
          <p className="eyebrow">Agent Trace</p>
          <h2>Request / response contract</h2>
        </div>
      </div>

      {trace ? (
        <dl className="trace-grid">
          <div>
            <dt>Mode</dt>
            <dd>{trace.mode}</dd>
          </div>
          <div>
            <dt>Request</dt>
            <dd>
              {trace.request.locale} · max {trace.request.maxTasks} tasks
            </dd>
          </div>
          <div>
            <dt>Prompt</dt>
            <dd>{trace.request.prompt}</dd>
          </div>
          <div>
            <dt>Approved context</dt>
            <dd>{summarizeTitles(trace.request.context.approvedTaskTitles)}</dd>
          </div>
          <div>
            <dt>Draft context</dt>
            <dd>{summarizeTitles(trace.request.context.draftTaskTitles)}</dd>
          </div>
          <div>
            <dt>Context budget</dt>
            <dd>{summarizeBudget(trace.request.context)}</dd>
          </div>
          <div>
            <dt>Context trust</dt>
            <dd>{summarizeTrustBoundary(trace.request.context)}</dd>
          </div>
          <div>
            <dt>Response</dt>
            <dd>{trace.responseSummary}</dd>
          </div>
          <div>
            <dt>Validation</dt>
            <dd>{trace.validationMessage ?? trace.validationStatus}</dd>
          </div>
          <div>
            <dt>Latency</dt>
            <dd>{trace.durationMs === undefined ? "pending" : `${trace.durationMs}ms`}</dd>
          </div>
        </dl>
      ) : (
        <div className="empty-state compact">아직 관찰할 AI 요청이 없습니다.</div>
      )}
    </section>
  );
}

function summarizeTitles(titles: string[]) {
  return titles.length > 0 ? titles.join(" · ") : "not included";
}

function summarizeBudget(context: AgentTrace["request"]["context"]) {
  const includedCount =
    context.approvedTaskTitles.length + context.draftTaskTitles.length;

  return `${includedCount} / ${context.taskTitleBudget} titles included · ${context.omittedTaskTitleCount} omitted`;
}

function summarizeTrustBoundary(context: AgentTrace["request"]["context"]) {
  return `structured task-title data · ${context.blockedTaskTitleCount} instruction-like titles blocked`;
}
