import type {
  RecoverySourceSummaryContractAggregateCoverage,
  RecoverySourceSummaryContractAggregateCoverageDisplayExample,
  RecoverySourceSummaryContractAggregateCoverageDisplayInput,
  RecoverySourceSummaryContractCheck,
  RecoverySourceSummaryContractExample,
  RecoverySourceSummaryContractGroup,
  RecoverySourceSummaryContractGroupsDisplayExample,
  RecoverySourceSummaryContractGroupsDisplayInput,
  RecoverySourceSummaryContractCheckSummary,
  RecoverySourceSummaryContractCheckSummaryPresentationAudience,
  RecoverySourceSummaryContractCheckSummaryPresentationDetailLevel,
  RecoverySourceSummaryContractCheckSummaryPresentation,
  RecoverySourceSummaryContractCheckSummaryPresentationMetadataExample,
  RecoverySourceSummaryContractCheckSummaryPresentationMetadataInput,
  RecoverySourceSummaryContractCheckSummaryStatus,
  RecoverySourceSummaryContractInventory,
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
  const displayText = formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks);
  const statusDisplayText = formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason);
  const diagnostics = summarizeRecoverySourceSummaryContractDiagnostics(checks);

  return {
    status,
    statusReason,
    statusDisplayText,
    presentation: createRecoverySourceSummaryContractCheckSummaryPresentation(
      displayText,
      statusDisplayText,
      diagnostics,
    ),
    total,
    passed,
    displayText,
    diagnostics,
  };
}

export function createRecoverySourceSummaryPolicyHealthSnapshot(): RecoverySourceSummaryPolicyHealthSnapshot {
  const contract = summarizeRecoverySourceSummaryContractChecks();
  const guidanceDisplayContract = summarizeRecoverySourceSummaryPolicyHealthGuidanceDisplayChecks();
  const presentationMetadataContract = summarizeRecoverySourceSummaryPresentationMetadataChecks();
  const contractGroupsDisplayContract = summarizeRecoverySourceSummaryContractGroupsDisplayChecks();
  const contractAggregateCoverageDisplayContract =
    summarizeRecoverySourceSummaryContractAggregateCoverageDisplayChecks();
  const contractGroups: RecoverySourceSummaryContractGroup[] = [
    createRecoverySourceSummaryContractGroup("summary", "summary contract", contract),
    createRecoverySourceSummaryContractGroup(
      "guidance-display",
      "guidance display contract",
      guidanceDisplayContract,
    ),
    createRecoverySourceSummaryContractGroup(
      "presentation-metadata",
      "presentation metadata contract",
      presentationMetadataContract,
    ),
    createRecoverySourceSummaryContractGroup(
      "contract-groups-display",
      "contract groups display contract",
      contractGroupsDisplayContract,
    ),
    createRecoverySourceSummaryContractGroup(
      "aggregate-coverage-display",
      "aggregate coverage display contract",
      contractAggregateCoverageDisplayContract,
    ),
  ];
  const contractAggregate = summarizeRecoverySourceSummaryPolicyContractAggregate(contractGroups);
  const contractAggregateCoverage = createRecoverySourceSummaryContractAggregateCoverage(contractGroups);
  const contractInventory = createRecoverySourceSummaryContractInventory(contractGroups);
  const status = getRecoverySourceSummaryPolicyHealthStatus(contractAggregate);

  return {
    status,
    guidance: getRecoverySourceSummaryPolicyHealthGuidance(status),
    guidanceDisplayContract,
    presentationMetadataContract,
    contractGroups,
    contractInventory,
    contractGroupsDisplayText: formatRecoverySourceSummaryContractGroupsDisplayText(contractGroups),
    contractGroupsDisplayContract,
    contractAggregate,
    contractAggregateCoverage,
    contractAggregateCoverageDisplayContract,
    policy: recoverySourceSummaryPolicy,
    contract,
  };
}

function createRecoverySourceSummaryContractGroup(
  id: RecoverySourceSummaryContractGroup["id"],
  label: string,
  summary: RecoverySourceSummaryContractCheckSummary,
): RecoverySourceSummaryContractGroup {
  return {
    id,
    label,
    displayText: formatRecoverySourceSummaryContractGroupDisplayText(id, summary.status),
    summary,
  };
}

function formatRecoverySourceSummaryContractGroupDisplayText(
  id: RecoverySourceSummaryContractGroup["id"],
  status: RecoverySourceSummaryContractCheckSummary["status"],
) {
  return `${id}:${status}`;
}

function formatRecoverySourceSummaryContractGroupsDisplayText(groups: RecoverySourceSummaryContractGroup[]) {
  return formatRecoverySourceSummaryContractGroupsDisplayInput({
    groupDisplayTexts: groups.map((group) => group.displayText),
  });
}

function createRecoverySourceSummaryContractInventory(
  groups: RecoverySourceSummaryContractGroup[],
): RecoverySourceSummaryContractInventory {
  const latestGroup = groups[groups.length - 1];

  return {
    groupCount: groups.length,
    latestGroupId: latestGroup.id,
    displayText: formatRecoverySourceSummaryContractInventoryDisplayText(groups.length, latestGroup.id),
    rationale: "Highlights the current contract group inventory before reading aggregate diagnostics.",
  };
}

function formatRecoverySourceSummaryContractInventoryDisplayText(
  groupCount: number,
  latestGroupId: RecoverySourceSummaryContractGroup["id"],
) {
  return `${groupCount} contract groups · latest ${latestGroupId}`;
}

function createRecoverySourceSummaryContractAggregateCoverage(
  groups: RecoverySourceSummaryContractGroup[],
): RecoverySourceSummaryContractAggregateCoverage {
  return {
    groupCount: groups.length,
    displayText: formatRecoverySourceSummaryContractAggregateCoverageDisplayText(groups.length),
    rationale: "Shows how many contract groups are included in the policy health aggregate.",
  };
}

function formatRecoverySourceSummaryContractAggregateCoverageDisplayText(groupCount: number) {
  return `${groupCount} contract group(s) covered`;
}

export const recoverySourceSummaryContractAggregateCoverageDisplayExamples: RecoverySourceSummaryContractAggregateCoverageDisplayExample[] =
  [
    {
      name: "four covered contract groups",
      input: {
        groupCount: 4,
      },
      expected: "4 contract group(s) covered",
    },
  ];

export function checkRecoverySourceSummaryContractAggregateCoverageDisplayExamples(): RecoverySourceSummaryContractCheck[] {
  return recoverySourceSummaryContractAggregateCoverageDisplayExamples.map((example) => {
    const actual = formatRecoverySourceSummaryContractAggregateCoverageDisplayInput(example.input);

    return {
      name: example.name,
      passed: actual === example.expected,
      mismatchedFields: actual === example.expected ? [] : ["contractAggregateCoverageDisplayText"],
    };
  });
}

export function summarizeRecoverySourceSummaryContractAggregateCoverageDisplayChecks(): RecoverySourceSummaryContractCheckSummary {
  const checks = checkRecoverySourceSummaryContractAggregateCoverageDisplayExamples();
  const total = checks.length;
  const passed = checks.filter((check) => check.passed).length;
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);
  const displayText = formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks);
  const statusDisplayText = formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason);
  const diagnostics = summarizeRecoverySourceSummaryContractDiagnostics(checks);

  return {
    status,
    statusReason,
    statusDisplayText,
    presentation: createRecoverySourceSummaryContractCheckSummaryPresentation(
      displayText,
      statusDisplayText,
      diagnostics,
    ),
    total,
    passed,
    displayText,
    diagnostics,
  };
}

function formatRecoverySourceSummaryContractAggregateCoverageDisplayInput(
  input: RecoverySourceSummaryContractAggregateCoverageDisplayInput,
) {
  return formatRecoverySourceSummaryContractAggregateCoverageDisplayText(input.groupCount);
}

export const recoverySourceSummaryContractGroupsDisplayExamples: RecoverySourceSummaryContractGroupsDisplayExample[] =
  [
    {
      name: "all contract groups passing",
      input: {
        groupDisplayTexts: [
          "summary:passing",
          "guidance-display:passing",
          "presentation-metadata:passing",
          "contract-groups-display:passing",
          "aggregate-coverage-display:passing",
        ],
      },
      expected:
        "summary:passing, guidance-display:passing, presentation-metadata:passing, contract-groups-display:passing, aggregate-coverage-display:passing",
    },
  ];

export function checkRecoverySourceSummaryContractGroupsDisplayExamples(): RecoverySourceSummaryContractCheck[] {
  return recoverySourceSummaryContractGroupsDisplayExamples.map((example) => {
    const actual = formatRecoverySourceSummaryContractGroupsDisplayInput(example.input);

    return {
      name: example.name,
      passed: actual === example.expected,
      mismatchedFields: actual === example.expected ? [] : ["contractGroupsDisplayText"],
    };
  });
}

export function summarizeRecoverySourceSummaryContractGroupsDisplayChecks(): RecoverySourceSummaryContractCheckSummary {
  const checks = checkRecoverySourceSummaryContractGroupsDisplayExamples();
  const total = checks.length;
  const passed = checks.filter((check) => check.passed).length;
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);
  const displayText = formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks);
  const statusDisplayText = formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason);
  const diagnostics = summarizeRecoverySourceSummaryContractDiagnostics(checks);

  return {
    status,
    statusReason,
    statusDisplayText,
    presentation: createRecoverySourceSummaryContractCheckSummaryPresentation(
      displayText,
      statusDisplayText,
      diagnostics,
    ),
    total,
    passed,
    displayText,
    diagnostics,
  };
}

function formatRecoverySourceSummaryContractGroupsDisplayInput(
  input: RecoverySourceSummaryContractGroupsDisplayInput,
) {
  return input.groupDisplayTexts.join(", ");
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
  const displayText = formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks);
  const statusDisplayText = formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason);
  const diagnostics = summarizeRecoverySourceSummaryContractDiagnostics(checks);

  return {
    status,
    statusReason,
    statusDisplayText,
    presentation: createRecoverySourceSummaryContractCheckSummaryPresentation(
      displayText,
      statusDisplayText,
      diagnostics,
    ),
    total,
    passed,
    displayText,
    diagnostics,
  };
}

export const recoverySourceSummaryPresentationMetadataExamples: RecoverySourceSummaryContractCheckSummaryPresentationMetadataExample[] =
  [
    {
      name: "state panel developer learner metadata",
      input: {
        intent: "state-panel-contract-review",
        detailLevel: "detailed",
        audience: "developer-learner",
      },
      expected: "state-panel-contract-review · detailed · developer-learner",
    },
  ];

export function checkRecoverySourceSummaryPresentationMetadataExamples(): RecoverySourceSummaryContractCheck[] {
  return recoverySourceSummaryPresentationMetadataExamples.map((example) => {
    const actual = formatRecoverySourceSummaryContractCheckSummaryPresentationMetadataInput(example.input);

    return {
      name: example.name,
      passed: actual === example.expected,
      mismatchedFields: actual === example.expected ? [] : ["metadataText"],
    };
  });
}

export function summarizeRecoverySourceSummaryPresentationMetadataChecks(): RecoverySourceSummaryContractCheckSummary {
  const checks = checkRecoverySourceSummaryPresentationMetadataExamples();
  const total = checks.length;
  const passed = checks.filter((check) => check.passed).length;
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);
  const displayText = formatRecoverySourceSummaryContractCheckSummaryDisplayText(checks);
  const statusDisplayText = formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason);
  const diagnostics = summarizeRecoverySourceSummaryContractDiagnostics(checks);

  return {
    status,
    statusReason,
    statusDisplayText,
    presentation: createRecoverySourceSummaryContractCheckSummaryPresentation(
      displayText,
      statusDisplayText,
      diagnostics,
    ),
    total,
    passed,
    displayText,
    diagnostics,
  };
}

function summarizeRecoverySourceSummaryPolicyContractAggregate(
  contractSummaries: RecoverySourceSummaryContractGroup[],
): RecoverySourceSummaryContractCheckSummary {
  const total = contractSummaries.reduce((currentTotal, item) => currentTotal + item.summary.total, 0);
  const passed = contractSummaries.reduce((currentPassed, item) => currentPassed + item.summary.passed, 0);
  const status = getRecoverySourceSummaryContractCheckSummaryStatus(passed, total);
  const statusReason = getRecoverySourceSummaryContractCheckSummaryStatusReason(passed, total);
  const displayText = formatRecoverySourceSummaryContractCheckSummaryCountDisplayText(passed, total);
  const statusDisplayText = formatRecoverySourceSummaryContractCheckSummaryStatusDisplayText(status, statusReason);
  const diagnostics = summarizeRecoverySourceSummaryPolicyContractAggregateDiagnostics(contractSummaries);

  return {
    status,
    statusReason,
    statusDisplayText,
    presentation: createRecoverySourceSummaryContractCheckSummaryPresentation(
      displayText,
      statusDisplayText,
      diagnostics,
    ),
    total,
    passed,
    displayText,
    diagnostics,
  };
}

function createRecoverySourceSummaryContractCheckSummaryPresentation(
  countText: string,
  statusText: string,
  diagnosticsText: string,
): RecoverySourceSummaryContractCheckSummaryPresentation {
  const intent = "state-panel-contract-review";
  const detailLevel = getRecoverySourceSummaryContractCheckSummaryPresentationDetailLevel();
  const audience = getRecoverySourceSummaryContractCheckSummaryPresentationAudience();

  return {
    intent,
    intentDescription: "Summarizes contract checks for review inside the state panel.",
    detailLevel,
    audience,
    audienceRationale: "Detailed policy contract metadata helps learners inspect how AI UI trust signals are assembled.",
    metadataText: formatRecoverySourceSummaryContractCheckSummaryPresentationMetadataText(
      intent,
      detailLevel,
      audience,
    ),
    countText,
    statusText,
    diagnosticsText,
  };
}

function formatRecoverySourceSummaryContractCheckSummaryPresentationMetadataText(
  intent: RecoverySourceSummaryContractCheckSummaryPresentation["intent"],
  detailLevel: RecoverySourceSummaryContractCheckSummaryPresentation["detailLevel"],
  audience: RecoverySourceSummaryContractCheckSummaryPresentation["audience"],
) {
  return `${intent} · ${detailLevel} · ${audience}`;
}

function formatRecoverySourceSummaryContractCheckSummaryPresentationMetadataInput(
  input: RecoverySourceSummaryContractCheckSummaryPresentationMetadataInput,
) {
  return formatRecoverySourceSummaryContractCheckSummaryPresentationMetadataText(
    input.intent,
    input.detailLevel,
    input.audience,
  );
}

function getRecoverySourceSummaryContractCheckSummaryPresentationDetailLevel(): RecoverySourceSummaryContractCheckSummaryPresentationDetailLevel {
  return "detailed";
}

function getRecoverySourceSummaryContractCheckSummaryPresentationAudience(): RecoverySourceSummaryContractCheckSummaryPresentationAudience {
  return "developer-learner";
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
  contractSummaries: RecoverySourceSummaryContractGroup[],
) {
  const failedSummaries = contractSummaries.filter((item) => item.summary.diagnostics !== "none");

  if (failedSummaries.length === 0) {
    return "none";
  }

  return failedSummaries.map((item) => `${item.label}: ${item.summary.diagnostics}`).join(" · ");
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
