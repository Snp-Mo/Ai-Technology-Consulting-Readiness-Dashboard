import Card from "../ui/Card.jsx";
import { riskTier, scoreTier, RISK_TIER_LABELS } from "../../data/metrics.js";
import { COLORS, INDUSTRY_COLORS, TIER_COLORS } from "../../theme/colors.js";

function MetaChip({ label, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
      <span className="uppercase tracking-[0.1em] text-[10px]">{label}</span>
      <span className="text-ink">{children}</span>
    </span>
  );
}

export default function CompanyHeader({ company }) {
  const industryColor = INDUSTRY_COLORS[company.industry] ?? COLORS.accent;
  const tier = riskTier(company);
  const scoreColor =
    company.score0to100 == null
      ? COLORS.ink
      : TIER_COLORS[scoreTier(company.score0to100, 100)];

  const RISK_BADGE_COLOR = {
    low: COLORS.good,
    moderate: COLORS.warn,
    high: COLORS.bad,
  };

  return (
    <Card accent={industryColor} className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-lg font-semibold">{company.companyName}</h2>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                color: industryColor,
                backgroundColor: `${industryColor}1f`,
              }}
            >
              <span
                aria-hidden
                className="size-1.5 rounded-full"
                style={{ backgroundColor: industryColor }}
              />
              {company.industry}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                color: RISK_BADGE_COLOR[tier],
                backgroundColor: `${RISK_BADGE_COLOR[tier]}1f`,
              }}
            >
              {RISK_TIER_LABELS[tier]} risk
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <MetaChip label="Size">{company.companySize || "—"}</MetaChip>
            <MetaChip label="Verification">
              {company.verificationStatus || "Unverified"}
            </MetaChip>
            <MetaChip label="Last checked">
              {company.lastCheckedDate || "—"}
            </MetaChip>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p
            className="font-mono text-4xl leading-none"
            style={{ color: scoreColor }}
          >
            {company.score0to100 == null ? "–" : company.score0to100}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted">
            Readiness / 100
          </p>
        </div>
      </div>
    </Card>
  );
}
