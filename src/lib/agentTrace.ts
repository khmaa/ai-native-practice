import type { PlanValidationFailureCategory } from "../types/aiContract";
import type { AgentTrace, TraceStatus } from "../types/agentTrace";
import type { PlannerPolicyRuleId } from "../types/plannerPolicy";

export function summarizeUnknownResponse(response: unknown) {
  if (typeof response !== "object" || response === null || Array.isArray(response)) {
    return `non-object ${typeof response}`;
  }

  const tasks = (response as { tasks?: unknown }).tasks;

  if (Array.isArray(tasks)) {
    return `object with tasks[${tasks.length}]`;
  }

  return `object with invalid tasks: ${typeof tasks}`;
}

export function completeTrace(
  trace: AgentTrace,
  {
    responseSummary,
    validationStatus,
    validationCategory,
    validationRuleId,
    validationMessage,
  }: {
    responseSummary: string;
    validationStatus: TraceStatus;
    validationCategory?: PlanValidationFailureCategory;
    validationRuleId?: PlannerPolicyRuleId;
    validationMessage?: string;
  },
): AgentTrace {
  return {
    ...trace,
    durationMs: Date.now() - trace.startedAt,
    responseSummary,
    validationStatus,
    validationCategory,
    validationRuleId,
    validationMessage,
  };
}
