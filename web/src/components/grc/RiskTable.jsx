import Card from "../ui/Card.jsx";
import { grcRiskIndex, riskTier, RISK_TIER_LABELS } from "../../data/metrics.js";
import { COLORS, INDUSTRY_COLORS, TIER_COLORS } from "../../theme/colors.js";

const RISK_BADGE_COLOR = {
  low: TIER_COLORS.good,
  moderate: TIER_COLORS.warn,
  high: TIER_COLORS.bad,
};

function Badge({ color, dot = false, children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ color, backgroundColor: `${color}1f` }}
    >
      {dot && (
        <span
          aria-hidden
          className="size-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
    </span>
  );
}

/** Filtered companies ranked by GRC risk index (weak GRC posture first). */
export default function RiskTable({ companies, limit = 10, delay = 0 }) {
  const ranked = [...companies]
    .sort((a, b) => (grcRiskIndex(b) ?? 0) - (grcRiskIndex(a) ?? 0))
    .slice(0, limit);

  return (
    <Card accent={COLORS.bad} delay={delay} className="p-5">
      <h2 className="text-sm font-semibold">Highest-risk companies</h2>
      <p className="mt-0.5 text-[10px] text-muted">
        Ranked by GRC risk index — 6 minus the average of privacy,
        cybersecurity, and governance scores (higher = weaker posture)
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3 font-medium">#</th>
              <th className="py-2 pr-3 font-medium">Company</th>
              <th className="py-2 pr-3 font-medium">Industry</th>
              <th className="py-2 pr-3 text-right font-medium">Risk index</th>
              <th className="py-2 font-medium">Risk tier</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((c, i) => {
              const tier = riskTier(c);
              const industryColor =
                INDUSTRY_COLORS[c.industry] ?? COLORS.accent;
              return (
                <tr
                  key={c.companyName}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="py-2 pr-3 font-mono text-muted">{i + 1}</td>
                  <td className="py-2 pr-3 font-medium text-ink">
                    {c.companyName}
                  </td>
                  <td className="py-2 pr-3">
                    <Badge color={industryColor} dot>
                      {c.industry}
                    </Badge>
                  </td>
                  <td className="py-2 pr-3 text-right font-mono text-ink">
                    {grcRiskIndex(c)?.toFixed(2) ?? "–"}
                  </td>
                  <td className="py-2">
                    <Badge color={RISK_BADGE_COLOR[tier]}>
                      {RISK_TIER_LABELS[tier]} risk
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {companies.length > limit && (
        <p className="mt-2 text-[10px] text-muted">
          Top {limit} of {companies.length} companies matching the current
          filters.
        </p>
      )}
    </Card>
  );
}
