import type { RecoverySourceSummaryPolicySnapshot, RecoverySourceSummaryResult } from "../types/planner";

export const recoverySourceSummaryPolicy: RecoverySourceSummaryPolicySnapshot = {
  id: "recovery-source-summary-v1",
  limit: 96,
  reason: "keeps recovery provenance scannable inside the state panel",
};

export function summarizeRecoverySource(message: string): RecoverySourceSummaryResult {
  const normalized = message.trim().replace(/\s+/g, " ");

  if (normalized.length <= recoverySourceSummaryPolicy.limit) {
    return {
      text: normalized,
      policy: recoverySourceSummaryPolicy,
      truncated: false,
    };
  }

  return {
    text: `${normalized.slice(0, recoverySourceSummaryPolicy.limit - 3)}...`,
    policy: recoverySourceSummaryPolicy,
    truncated: true,
  };
}
