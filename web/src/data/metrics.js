// Pure derivations over the company array from loadCompanies().

export const CATEGORY_FIELDS = [
  { field: "aiReadinessScore", label: "AI Readiness" },
  { field: "privacyScore", label: "Privacy" },
  { field: "cybersecurityScore", label: "Cybersecurity" },
  { field: "governanceScore", label: "Governance" },
  { field: "automationOpportunityScore", label: "Automation" },
  { field: "implementationComplexityScore", label: "Complexity" },
];

function mean(values) {
  const nums = values.filter((v) => v != null);
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/**
 * Normalize the free-text Risk Level column into low / moderate / high.
 * Order matters: "Moderate-high readiness / Manageable visible risk" contains
 * "high readiness", so the moderate check must run before the low check.
 */
export function riskTier(company) {
  const s = (company.riskLevel ?? "").toLowerCase();
  if (s.includes("high risk")) return "high";
  if (s.includes("moderate")) return "moderate";
  if (
    s.includes("low risk") ||
    s.includes("lower risk") ||
    s.includes("high readiness")
  ) {
    return "low";
  }
  return "moderate";
}

export const RISK_TIER_LABELS = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

/** good / warn / bad tier for a score on a 5-point or 100-point scale. */
export function scoreTier(value, max = 5) {
  if (value == null) return "warn";
  const [good, warn] = max === 100 ? [75, 55] : [4, 3];
  if (value >= good) return "good";
  if (value >= warn) return "warn";
  return "bad";
}

/** Derived risk axis: weak GRC posture reads as high risk (1 = low, 5 = high). */
export function grcRiskIndex(company) {
  const avg = mean([
    company.privacyScore,
    company.cybersecurityScore,
    company.governanceScore,
  ]);
  return avg == null ? null : Math.round((6 - avg) * 100) / 100;
}

/** Average of each of the 6 category scores across companies. */
export function categoryAverages(companies) {
  return CATEGORY_FIELDS.map(({ field, label }) => ({
    category: label,
    average: mean(companies.map((c) => c[field])),
  }));
}

/** industry rows x category columns of average scores, in Nivo heatmap shape. */
export function industryCategoryMatrix(companies, industryOrder) {
  const industries = industryOrder.filter((ind) =>
    companies.some((c) => c.industry === ind),
  );
  return industries.map((industry) => {
    const group = companies.filter((c) => c.industry === industry);
    return {
      id: industry,
      data: CATEGORY_FIELDS.map(({ field, label }) => ({
        x: label,
        y: mean(group.map((c) => c[field])),
      })),
    };
  });
}

export function topCompanies(companies, n = 8) {
  return [...companies]
    .sort((a, b) => (b.score0to100 ?? 0) - (a.score0to100 ?? 0))
    .slice(0, n);
}

export function kpis(companies) {
  const avgReadiness = mean(companies.map((c) => c.aiReadinessScore));
  return {
    count: companies.length,
    avgReadiness: avgReadiness == null ? null : Math.round(avgReadiness * 10) / 10,
    highRisk: companies.filter((c) => riskTier(c) === "high").length,
    highOpportunity: companies.filter(
      (c) => c.automationOpportunityScore === 5,
    ).length,
    industries: new Set(companies.map((c) => c.industry)).size,
  };
}

function parseCheckedDate(value) {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec((value ?? "").trim());
  if (!m) return null;
  const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  return new Date(year, Number(m[1]) - 1, Number(m[2]));
}

/** Most recent Last Checked Date across the dataset, formatted for display. */
export function latestCheckedDate(companies) {
  const dates = companies
    .map((c) => parseCheckedDate(c.lastCheckedDate))
    .filter(Boolean);
  if (dates.length === 0) return null;
  const latest = new Date(Math.max(...dates));
  return latest.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
