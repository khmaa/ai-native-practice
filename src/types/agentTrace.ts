import type { PlanRequest } from "./aiContract";
import type { PlanValidationFailureCategory } from "./aiContract";

export type TraceStatus = "pending" | "passed" | "failed" | "cancelled";

export type AgentTrace = {
  request: PlanRequest;
  mode: "valid" | "contract-failure" | "duplicate-title";
  startedAt: number;
  durationMs?: number;
  responseSummary: string;
  validationStatus: TraceStatus;
  validationCategory?: PlanValidationFailureCategory;
  validationMessage?: string;
};
