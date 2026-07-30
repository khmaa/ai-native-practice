import type {
  RecoverySourceSummaryContractCheck,
  RecoverySourceSummaryContractExample,
  RecoverySourceSummaryPolicySnapshot,
  RecoverySourceSummaryResult,
} from "../types/planner";

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

export const recoverySourceSummaryContractExamples: RecoverySourceSummaryContractExample[] = [
  {
    name: "complete source issue summary",
    input: "Title is required.",
    expected: {
      text: "Title is required.",
      policy: recoverySourceSummaryPolicy,
      truncated: false,
    },
  },
  {
    name: "truncated source issue summary",
    input: "A".repeat(recoverySourceSummaryPolicy.limit + 4),
    expected: {
      text: `${"A".repeat(recoverySourceSummaryPolicy.limit - 3)}...`,
      policy: recoverySourceSummaryPolicy,
      truncated: true,
    },
  },
];

export function checkRecoverySourceSummaryContractExamples(): RecoverySourceSummaryContractCheck[] {
  return recoverySourceSummaryContractExamples.map((example) => {
    const actual = summarizeRecoverySource(example.input);

    return {
      name: example.name,
      passed: isRecoverySourceSummaryResultEqual(actual, example.expected),
    };
  });
}

function isRecoverySourceSummaryResultEqual(
  actual: RecoverySourceSummaryResult,
  expected: RecoverySourceSummaryResult,
) {
  return actual.text === expected.text
    && actual.truncated === expected.truncated
    && actual.policy.id === expected.policy.id
    && actual.policy.limit === expected.policy.limit
    && actual.policy.reason === expected.policy.reason;
}
