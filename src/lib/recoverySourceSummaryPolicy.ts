import type {
  RecoverySourceSummaryContractCheck,
  RecoverySourceSummaryContractExample,
  RecoverySourceSummaryContractCheckSummary,
  RecoverySourceSummaryPolicyHealthGuidance,
  RecoverySourceSummaryPolicyHealthStatus,
  RecoverySourceSummaryPolicyHealthSnapshot,
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
    const mismatchedFields = findRecoverySourceSummaryMismatches(actual, example.expected);

    return {
      name: example.name,
      passed: mismatchedFields.length === 0,
      mismatchedFields,
    };
  });
}

export function summarizeRecoverySourceSummaryContractChecks(): RecoverySourceSummaryContractCheckSummary {
  const checks = checkRecoverySourceSummaryContractExamples();

  return {
    total: checks.length,
    passed: checks.filter((check) => check.passed).length,
    diagnostics: summarizeRecoverySourceSummaryContractDiagnostics(checks),
  };
}

export function createRecoverySourceSummaryPolicyHealthSnapshot(): RecoverySourceSummaryPolicyHealthSnapshot {
  const contract = summarizeRecoverySourceSummaryContractChecks();
  const status = getRecoverySourceSummaryPolicyHealthStatus(contract);

  return {
    status,
    guidance: getRecoverySourceSummaryPolicyHealthGuidance(status),
    policy: recoverySourceSummaryPolicy,
    contract,
  };
}

function getRecoverySourceSummaryPolicyHealthStatus(
  contract: RecoverySourceSummaryContractCheckSummary,
): RecoverySourceSummaryPolicyHealthStatus {
  return contract.passed === contract.total ? "healthy" : "degraded";
}

function getRecoverySourceSummaryPolicyHealthGuidance(
  status: RecoverySourceSummaryPolicyHealthStatus,
): RecoverySourceSummaryPolicyHealthGuidance {
  if (status === "healthy") {
    return {
      label: "safe to display",
      message: "Contract examples are passing, so the recovery source summary can be shown as designed.",
    };
  }

  return {
    label: "review diagnostics",
    message: "Some contract examples are failing, so inspect diagnostics before trusting the recovery summary display.",
  };
}

function findRecoverySourceSummaryMismatches(
  actual: RecoverySourceSummaryResult,
  expected: RecoverySourceSummaryResult,
) {
  return [
    actual.text === expected.text ? undefined : "text",
    actual.truncated === expected.truncated ? undefined : "truncated",
    actual.policy.id === expected.policy.id ? undefined : "policy.id",
    actual.policy.limit === expected.policy.limit ? undefined : "policy.limit",
    actual.policy.reason === expected.policy.reason ? undefined : "policy.reason",
  ].filter((field): field is string => Boolean(field));
}

function summarizeRecoverySourceSummaryContractDiagnostics(
  checks: RecoverySourceSummaryContractCheck[],
) {
  const failedChecks = checks.filter((check) => !check.passed);

  if (failedChecks.length === 0) {
    return "none";
  }

  return failedChecks
    .map((check) => `${check.name}: ${check.mismatchedFields.join(", ")}`)
    .join(" · ");
}
