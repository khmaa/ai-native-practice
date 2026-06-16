import type { PlanRequest } from "./aiContract";

export type TraceStatus = "pending" | "passed" | "failed" | "cancelled";

export type AgentTrace = {
  request: PlanRequest;
  mode: "valid" | "contract-failure" | "duplicate-title";
  startedAt: number;
  durationMs?: number;
  responseSummary: string;
  validationStatus: TraceStatus;
  validationMessage?: string;
};
