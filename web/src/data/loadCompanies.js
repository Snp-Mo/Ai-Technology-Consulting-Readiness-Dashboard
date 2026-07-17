import Papa from "papaparse";

const CSV_URL = `${import.meta.env?.BASE_URL ?? "/"}data/companies.csv`;

// The CSV is currently valid UTF-8, but if it is ever re-saved through a tool
// that decodes it as Windows-1252 (Excel), curly quotes and dashes turn into
// these "â€…"-style sequences. Mapping them back is a no-op on
// clean text. Longer sequences must come first: the bare "â€"
// fallback would otherwise consume the prefix of the entries below it.
const MOJIBAKE_FIXES = [
  ["â€™", "’"], // right single quote ’
  ["â€˜", "‘"], // left single quote ‘
  ["â€œ", "“"], // left double quote “
  ["â€", "”"], // right double quote ”
  ["â€“", "–"], // en dash –
  ["â€”", "—"], // em dash —
  ["â€¦", "…"], // ellipsis …
  ["â€", "–"], // bare truncated sequence, most often a dash
  ["Â", ""], // stray non-breaking-space artifact
];

function cleanText(value) {
  if (typeof value !== "string") return value;
  let out = value;
  for (const [bad, good] of MOJIBAKE_FIXES) {
    out = out.split(bad).join(good);
  }
  return out.trim();
}

// CSV header -> camelCase field on the company object
const FIELD_MAP = {
  company_name: "companyName",
  Industry: "industry",
  "Company Size/Type": "companySize",
  "Source URL 1": "sourceUrl1",
  "Source URL 2": "sourceUrl2",
  "Source URL 3": "sourceUrl3",
  "AI Readiness Notes": "aiReadinessNotes",
  "Data Privacy Notes": "dataPrivacyNotes",
  "Cybersecurity Notes": "cybersecurityNotes",
  "Governance Notes": "governanceNotes",
  "Automation Opportunity Notes": "automationOpportunityNotes",
  "Implementation Complexity Notes": "implementationComplexityNotes",
  "AI Readiness Score": "aiReadinessScore",
  "Privacy Score": "privacyScore",
  "Cybersecurity Score": "cybersecurityScore",
  "Governance Score": "governanceScore",
  "Automation Opportunity Score": "automationOpportunityScore",
  "Implementation Complexity Score": "implementationComplexityScore",
  "Overall Readiness Score": "overallReadinessScore",
  "Score 0 to 100": "score0to100",
  "Risk Level": "riskLevel",
  "AI Summary": "aiSummary",
  "AI Recommendation": "aiRecommendation",
  "AI Output Review Status": "aiOutputReviewStatus",
  "Scoring Version": "scoringVersion",
  "Verification Status": "verificationStatus",
  "Last Checked Date": "lastCheckedDate",
};

const NUMERIC_FIELDS = [
  "aiReadinessScore",
  "privacyScore",
  "cybersecurityScore",
  "governanceScore",
  "automationOpportunityScore",
  "implementationComplexityScore",
  "overallReadinessScore",
  "score0to100",
];

function toCompany(row) {
  const company = {};
  for (const [header, field] of Object.entries(FIELD_MAP)) {
    company[field] = cleanText(row[header] ?? "");
  }
  for (const field of NUMERIC_FIELDS) {
    const n = Number(company[field]);
    company[field] = company[field] === "" || Number.isNaN(n) ? null : n;
  }
  return company;
}

/**
 * Fetch and parse public/data/companies.csv into an array of company objects.
 * Drops the blank separator rows between industry groups and the trailing
 * empty row (any row without a company_name).
 */
export async function loadCompanies() {
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch companies.csv: ${response.status}`);
  }
  const text = await response.text();

  const { data, errors } = Papa.parse(text, {
    header: true,
    skipEmptyLines: "greedy",
  });
  const fatal = errors.filter((e) => e.code !== "TooFewFields");
  if (fatal.length > 0) {
    console.warn("CSV parse warnings:", fatal);
  }

  return data
    .filter((row) => (row.company_name ?? "").trim() !== "")
    .map(toCompany);
}
