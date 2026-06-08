import type { PlanRequest } from "../types/aiContract";
import { createBrokenPlanResponse, createMockPlanResponse } from "./mockPlanner";
import { wait } from "./wait";

export type PlannerAgentMode = "valid" | "contract-failure";

export async function requestPlanDraft(
  request: PlanRequest,
  mode: PlannerAgentMode = "valid",
): Promise<unknown> {
  await wait(520);

  if (mode === "contract-failure") {
    return createBrokenPlanResponse();
  }

  return createMockPlanResponse(request.prompt);
}

export function createPlanRequest(prompt: string): PlanRequest {
  return {
    prompt,
    maxTasks: 5,
    locale: "ko",
  };
}
