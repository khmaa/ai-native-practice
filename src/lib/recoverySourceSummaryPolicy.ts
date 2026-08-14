import type {
  RecoverySourceSummaryContractCheck,
  RecoverySourceSummaryContractExample,
  RecoverySourceSummaryContractCheckSummary,
  RecoverySourceSummaryContractCheckSummaryStatus,
  RecoverySourceSummaryPolicyHealthGuidance,
  RecoverySourceSummaryPolicyHealthGuidanceDisplayExample,
  RecoverySourceSummaryPolicyHealthGuidanceDisplayInput,
  RecoverySourceSummaryPolicyHealthGuidanceSeverity,
  RecoverySourceSummaryPolicyHealthGuidanceTone,
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
  const total = checks.length;
  const passed = checks.filter((check) => check.passed).length;
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);

  return {
    status,
    statusReason,
    statusDisplayText: formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason),
    total,
    passed,
    displayText: formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks),
    diagnostics: summarizeRecoverySourceSummaryContractDiagnostics(checks),
  };
}

export function createRecoverySourceSummaryPolicyHealthSnapshot(): RecoverySourceSummaryPolicyHealthSnapshot {
  const contract = summarizeRecoverySourceSummaryContractChecks();
  const guidanceDisplayContract = summarizeRecoverySourceSummaryPolicyHealthGuidanceDisplayChecks();
  const contractAggregate = summarizeRecoverySourceSummaryPolicyContractAggregate([
    {
      name: "summary",
      summary: contract,
    },
    {
      name: "guidance display",
      summary: guidanceDisplayContract,
    },
  ]);
  const status = getRecoverySourceSummaryPolicyHealthStatus(contractAggregate);

  return {
    status,
    guidance: getRecoverySourceSummaryPolicyHealthGuidance(status),
    guidanceDisplayContract,
    contractAggregate,
    policy: recoverySourceSummaryPolicy,
    contract,
  };
}

export const recoverySourceSummaryPolicyHealthGuidanceDisplayExamples: RecoverySourceSummaryPolicyHealthGuidanceDisplayExample[] =
  [
    {
      name: "healthy guidance display",
      input: {
        severity: "info",
        tone: "calm",
        label: "safe to display",
      },
      expected: "info · calm · safe to display",
    },
    {
      name: "degraded guidance display",
      input: {
        severity: "warning",
        tone: "cautious",
        label: "review diagnostics",
      },
      expected: "warning · cautious · review diagnostics",
    },
  ];

export function checkRecoverySourceSummaryPolicyHealthGuidanceDisplayExamples(): RecoverySourceSummaryContractCheck[] {
  return recoverySourceSummaryPolicyHealthGuidanceDisplayExamples.map((example) => {
    const actual = formatRecoverySourceSummaryPolicyHealthGuidanceDisplayInput(example.input);

    return {
      name: example.name,
      passed: actual === example.expected,
      mismatchedFields: actual === example.expected ? [] : ["displayText"],
    };
  });
}

export function summarizeRecoverySourceSummaryPolicyHealthGuidanceDisplayChecks(): RecoverySourceSummaryContractCheckSummary {
  const checks = checkRecoverySourceSummaryPolicyHealthGuidanceDisplayExamples();
  const total = checks.length;
  const passed = checks.filter((check) => check.passed).length;
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);

  return {
    status,
    statusReason,
    statusDisplayText: formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason),
    total,
    passed,
    displayText: formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks),
    diagnostics: summarizeRecoverySourceSummaryContractDiagnostics(checks),
  };
}

function summarizeRecoverySourceSummaryPolicyContractAggregate(
  contractSummaries: { name: string; summary: RecoverySourceSummaryContractCheckSummary }[],
): RecoverySourceSummaryContractCheckSummary {
  const total = contractSummaries.reduce((currentTotal, item) => currentTotal + item.summary.total, 0);
  const passed = contractSummaries.reduce((currentPassed, item) => currentPassed + item.summary.passed, 0);
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);

  return {
    status,
    statusReason,
    statusDisplayText: formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason),
    total,
    passed,
    displayText: formatRecoverySourceSummaryContractCheckSummaryCountDisplayText(passed, total),
    diagnostics: summarizeRecoverySourceSummaryPolicyContractAggregateDiagnostics(contractSummaries),
  };
}

function getRecoverySourceSummaryContractCheckSummaryStatus(
  passed: number,
  total: number,
): RecoverySourceSummaryContractCheckSummaryStatus {
  return passed === total ? "passing" : "failing";
}

function getRecoverySourceSummaryContractCheckSummaryStatusReason(passed: number, total: number) {
  if (passed === total) {
    return "all contract examples passed";
  }

  return `${total - passed} contract example(s) failed`;
}

function formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(
  status: RecoverySourceSummaryContractCheckSummaryStatus,
  statusReason: string,
) {
  return `${status} · ${statusReason}`;
}

function formatRecoverySourceSummaryContractCheckSummaryDisplayText(
  checks: RecoverySourceSummaryContractCheck[],
) {
  return formatRecoverySourceSummaryContractCheckSummaryCountDisplayText(
    checks.filter((check) => check.passed).length,
    checks.length,
  );
}

function formatRecoverySourceSummaryContractCheckSummaryCountDisplayText(passed: number, total: number) {
  return `${passed}/${total} passing`;
}

function summarizeRecoverySourceSummaryPolicyContractAggregateDiagnostics(
  contractSummaries: { name: string; summary: RecoverySourceSummaryContractCheckSummary }[],
) {
  const failedSummaries = contractSummaries.filter((item) => item.summary.diagnostics !== "none");

  if (failedSummaries.length === 0) {
    return "none";
  }

  return failedSummaries.map((item) => `${item.name}: ${item.summary.diagnostics}`).join(" · ");
}

function getRecoverySourceSummaryPolicyHealthStatus(
  contract: RecoverySourceSummaryContractCheckSummary,
): RecoverySourceSummaryPolicyHealthStatus {
  return contract.passed === contract.total ? "healthy" : "degraded";
}

function getRecoverySourceSummaryPolicyHealthGuidance(
  status: RecoverySourceSummaryPolicyHealthStatus,
): RecoverySourceSummaryPolicyHealthGuidance {
  const severity = getRecoverySourceSummaryPolicyHealthGuidanceSeverity(status);
  const tone = getRecoverySourceSummaryPolicyHealthGuidanceTone(status);

  if (status === "healthy") {
    const label = "safe to display";

    return {
      severity,
      tone,
      label,
      displayText: formatRecoverySourceSummaryPolicyHealthGuidanceDisplayText(severity, tone, label),
      message: "Contract examples are passing, so the recovery source summary can be shown as designed.",
    };
  }

  const label = "review diagnostics";

  return {
    severity,
    tone,
    label,
    displayText: formatRecoverySourceSummaryPolicyHealthGuidanceDisplayText(severity, tone, label),
    message: "Some contract examples are failing, so inspect diagnostics before trusting the recovery summary display.",
  };
}

function formatRecoverySourceSummaryPolicyHealthGuidanceDisplayText(
  severity: RecoverySourceSummaryPolicyHealthGuidanceSeverity,
  tone: RecoverySourceSummaryPolicyHealthGuidanceTone,
  label: string,
) {
  return `${severity} · ${tone} · ${label}`;
}

function formatRecoverySourceSummaryPolicyHealthGuidanceDisplayInput(
  input: RecoverySourceSummaryPolicyHealthGuidanceDisplayInput,
) {
  return formatRecoverySourceSummaryPolicyHealthGuidanceDisplayText(input.severity, input.tone, input.label);
}

function getRecoverySourceSummaryPolicyHealthGuidanceSeverity(
  status: RecoverySourceSummaryPolicyHealthStatus,
): RecoverySourceSummaryPolicyHealthGuidanceSeverity {
  return status === "healthy" ? "info" : "warning";
}

function getRecoverySourceSummaryPolicyHealthGuidanceTone(
  status: RecoverySourceSummaryPolicyHealthStatus,
): RecoverySourceSummaryPolicyHealthGuidanceTone {
  return status === "healthy" ? "calm" : "cautious";
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
