import Card from "../ui/Card.jsx";
import { scoreTier } from "../../data/metrics.js";
import { COLORS, INDUSTRY_COLORS, TIER_COLORS } from "../../theme/colors.js";

function Badge({ color, children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ color, backgroundColor: `${color}1f` }}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {children}
    </span>
  );
}

/**
 * Filtered companies ranked by automation opportunity. Scores are heavily
 * tied (the whole dataset sits at 4–5), so ties break by lower implementation
 * complexity, then higher overall readiness.
 */
export default function OpportunityLeaderboard({ companies, limit = 10, delay = 0 }) {
  const ranked = [...companies]
    .sort(
      (a, b) =>
        (b.automationOpportunityScore ?? 0) - (a.automationOpportunityScore ?? 0) ||
        (a.implementationComplexityScore ?? 6) - (b.implementationComplexityScore ?? 6) ||
        (b.score0to100 ?? 0) - (a.score0to100 ?? 0),
    )
    .slice(0, limit);

  return (
    <Card accent={COLORS.good} delay={delay} className="p-5">
      <h2 className="text-sm font-semibold">Automation opportunity leaderboard</h2>
      <p className="mt-0.5 text-[10px] text-muted">
        Every company in the dataset scores 4 or 5 on automation opportunity —
        ties break by lower implementation complexity, then overall readiness
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3 font-medium">#</th>
              <th className="py-2 pr-3 font-medium">Company</th>
              <th className="py-2 pr-3 font-medium">Industry</th>
              <th className="py-2 pr-3 text-right font-medium">Automation</th>
              <th className="py-2 pr-3 text-right font-medium">Complexity</th>
              <th className="py-2 text-right font-medium">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((c, i) => (
              <tr
                key={c.companyName}
                className="border-b border-white/5 last:border-b-0"
              >
                <td className="py-2 pr-3 font-mono text-muted">{i + 1}</td>
                <td className="py-2 pr-3 font-medium text-ink">
                  {c.companyName}
                </td>
                <td className="py-2 pr-3">
                  <Badge color={INDUSTRY_COLORS[c.industry] ?? COLORS.accent}>
                    {c.industry}
                  </Badge>
                </td>
                <td
                  className="py-2 pr-3 text-right font-mono"
                  style={{
                    color: TIER_COLORS[scoreTier(c.automationOpportunityScore)],
                  }}
                >
                  {c.automationOpportunityScore ?? "–"}/5
                </td>
                <td className="py-2 pr-3 text-right font-mono text-ink">
                  {c.implementationComplexityScore ?? "–"}/5
                </td>
                <td className="py-2 text-right font-mono text-ink">
                  {c.score0to100 ?? "–"}
                </td>
              </tr>
            ))}
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
