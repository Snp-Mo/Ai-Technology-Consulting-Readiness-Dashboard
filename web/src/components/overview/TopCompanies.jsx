import Card from "../ui/Card.jsx";
import { topCompanies, scoreTier } from "../../data/metrics.js";
import { INDUSTRY_COLORS, TIER_COLORS } from "../../theme/colors.js";

export default function TopCompanies({ companies, delay = 0 }) {
  const top = topCompanies(companies, 8);

  return (
    <Card delay={delay} className="p-5">
      <h2 className="mb-4 text-sm font-semibold">Top Performing Companies</h2>
      <ol className="space-y-3">
        {top.map((c, i) => {
          const tier = scoreTier(c.score0to100, 100);
          return (
            <li key={c.companyName} className="flex items-center gap-2.5">
              <span className="w-4 shrink-0 font-mono text-[11px] text-muted">
                {i + 1}
              </span>
              <span
                aria-hidden
                title={c.industry}
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: INDUSTRY_COLORS[c.industry] }}
              />
              <span className="min-w-0 flex-1 truncate text-xs">
                {c.companyName}
              </span>
              <span className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-white/5">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${c.score0to100 ?? 0}%`,
                    backgroundColor: TIER_COLORS[tier],
                  }}
                />
              </span>
              <span
                className="w-10 shrink-0 text-right font-mono text-xs"
                style={{ color: TIER_COLORS[tier] }}
              >
                {c.score0to100}
              </span>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
