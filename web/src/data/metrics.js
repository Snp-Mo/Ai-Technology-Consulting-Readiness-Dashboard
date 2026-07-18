// Pure derivations over the company array from loadCompanies().

export const CATEGORY_FIELDS = [
  {
    field: "aiReadinessScore",
    label: "AI Readiness",
    notesField: "aiReadinessNotes",
  },
  { field: "privacyScore", label: "Privacy", notesField: "dataPrivacyNotes" },
  {
    field: "cybersecurityScore",
    label: "Cybersecurity",
    notesField: "cybersecurityNotes",
  },
  {
    field: "governanceScore",
    label: "Governance",
    notesField: "governanceNotes",
  },
  {
    field: "automationOpportunityScore",
    label: "Automation",
    notesField: "automationOpportunityNotes",
  },
  {
    field: "implementationComplexityScore",
    label: "Complexity",
    notesField: "implementationComplexityNotes",
  },
];

/** The three governance/risk/compliance categories the GRC page reads. */
export const GRC_FIELDS = CATEGORY_FIELDS.filter(({ field }) =>
  ["privacyScore", "cybersecurityScore", "governanceScore"].includes(field),
);

export function mean(values) {
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

/** Per-industry rollup for the Industry Comparison summary cards. */
export function industrySummaries(companies, industryOrder) {
  return industryOrder
    .filter((ind) => companies.some((c) => c.industry === ind))
    .map((industry) => {
      const group = companies.filter((c) => c.industry === industry);
      const avg = mean(group.map((c) => c.score0to100));
      return {
        industry,
        count: group.length,
        avgScore100: avg == null ? null : Math.round(avg * 10) / 10,
        highRisk: group.filter((c) => riskTier(c) === "high").length,
        topCompany: topCompanies(group, 1)[0]?.companyName ?? null,
      };
    });
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

/**
 * Condense a long free-text Notes field to a single-sentence pull for the
 * Deep Dive strength/watch cards. Returns null — so callers can show a
 * "Needs review" fallback instead of a broken card — when the note is empty or
 * looks source-truncated. Some cells start mid-word ("itedHealth…",
 * "mplementation complexity…"); a clean note always opens with a capital or a
 * digit, so a lowercase first character is a reliable truncation signal.
 */
export function noteHighlight(note, maxLen = 150) {
  const text = (note ?? "").trim();
  if (text === "" || /^[a-z]/.test(text)) return null;
  const firstSentence = text.split(/(?<=[.!?])\s/)[0] ?? text;
  if (firstSentence.length <= maxLen) return firstSentence;
  return firstSentence.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

/**
 * Per-category readiness read for one company: a strength when the 1–5 score
 * is >= 4, a watch area when it is <= 3, each paired with a one-sentence pull
 * from that category's Notes column (null when the note needs review).
 */
export function categoryHighlights(company) {
  return CATEGORY_FIELDS.map(({ field, label, notesField }) => {
    const value = company[field];
    const kind =
      value == null ? null : value >= 4 ? "strength" : value <= 3 ? "watch" : null;
    return { field, label, value, kind, note: noteHighlight(company[notesField]) };
  });
}

/**
 * Watch-tier privacy/cybersecurity/governance highlights across companies,
 * flattened for the GRC risk-signals feed. Each entry keeps its company plus
 * the categoryHighlights shape ({field, label, value, kind, note}).
 */
export function grcWatchSignals(companies) {
  const grcFieldNames = new Set(GRC_FIELDS.map((f) => f.field));
  return companies.flatMap((company) =>
    categoryHighlights(company)
      .filter((h) => h.kind === "watch" && grcFieldNames.has(h.field))
      .map((h) => ({ company, ...h })),
  );
}

/**
 * True when the AI Output Review Status confirms the row's generated outputs
 * were reviewed. The column is long free text, never a literal "Reviewed" —
 * most rows say "…have been reviewed…", but six healthcare rows describe the
 * company's own AI-review *process* instead ("Kaiser reviews AI outputs
 * through…") and never state the row itself was reviewed, so a word-boundary
 * "reviewed" match separates the two.
 */
export function isRecommendationReviewed(company) {
  return /\breviewed\b/i.test(company.aiOutputReviewStatus ?? "");
}

/**
 * Split the top automation-opportunity companies (score 5, matching the High
 * Opportunity KPI rule) by implementation complexity. No company scores below
 * 3 on complexity (dataset floor), so "quick wins" are the lowest band that
 * actually exists: complexity <= 3. Everything else at opportunity 5 is a
 * longer-term bet (complexity 4–5). Companies at opportunity 4 join neither
 * list.
 */
export function recommendationPriorities(companies) {
  const high = companies.filter((c) => c.automationOpportunityScore === 5);
  return {
    quickWins: high.filter((c) => (c.implementationComplexityScore ?? 6) <= 3),
    longerTerm: high.filter((c) => (c.implementationComplexityScore ?? 0) >= 4),
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
