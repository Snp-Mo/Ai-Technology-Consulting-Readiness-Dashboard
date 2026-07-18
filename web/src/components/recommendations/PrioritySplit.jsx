import Card from "../ui/Card.jsx";
import { recommendationPriorities } from "../../data/metrics.js";
import { COLORS } from "../../theme/colors.js";

function CompanyChips({ companies, color }) {
  if (companies.length === 0) {
    return (
      <p className="mt-4 text-xs text-muted">
        No companies in this band among the current filters.
      </p>
    );
  }
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {companies.map((c) => (
        <li
          key={c.companyName}
          className="flex items-baseline gap-1.5 rounded bg-white/[0.03] px-2.5 py-1.5"
        >
          <span className="text-[11px] font-medium text-ink">
            {c.companyName}
          </span>
          <span className="font-mono text-[10px]" style={{ color }}>
            cx {c.implementationComplexityScore}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Quick wins vs longer-term bets among the opportunity-5 companies, split by
 * implementation complexity — the one page where complexity is in scope, per
 * the blueprint's Recommendations spec.
 */
export default function PrioritySplit({ companies, delay = 0 }) {
  const { quickWins, longerTerm } = recommendationPriorities(companies);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card accent={COLORS.good} delay={delay} className="p-5">
        <h2 className="text-sm font-semibold">Quick wins</h2>
        <p className="mt-0.5 text-[10px] text-muted">
          Top automation opportunity (5/5) at the dataset&rsquo;s lowest
          implementation complexity (3/5 — no company scores below 3)
        </p>
        <CompanyChips companies={quickWins} color={COLORS.good} />
      </Card>
      <Card accent={COLORS.warn} delay={delay + 0.05} className="p-5">
        <h2 className="text-sm font-semibold">Longer-term bets</h2>
        <p className="mt-0.5 text-[10px] text-muted">
          Top automation opportunity (5/5) but high implementation complexity
          (4–5/5) — bigger payoff, heavier lift
        </p>
        <CompanyChips companies={longerTerm} color={COLORS.warn} />
      </Card>
    </div>
  );
}
