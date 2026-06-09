import type { PlanRequest } from "../types/aiContract";
import { createBrokenPlanResponse, createMockPlanResponse } from "./mockPlanner";
import { wait } from "./wait";

export type PlannerAgentMode = "valid" | "contract-failure";

export async function requestPlanDraft(
  request: PlanRequest,
  mode: PlannerAgentMode = "valid",
  signal?: AbortSignal,
): Promise<unknown> {
  await waitForDraft(900, signal);

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

function waitForDraft(ms: number, signal?: AbortSignal) {
  if (!signal) {
    return wait(ms);
  }

  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(createAbortError());
      return;
    }

    const timeoutId = window.setTimeout(() => {
      signal.removeEventListener("abort", handleAbort);
      resolve();
    }, ms);

    function handleAbort() {
      window.clearTimeout(timeoutId);
      reject(createAbortError());
    }

    signal.addEventListener("abort", handleAbort, { once: true });
  });
}

function createAbortError() {
  return new DOMException("Planner draft request was cancelled.", "AbortError");
}
