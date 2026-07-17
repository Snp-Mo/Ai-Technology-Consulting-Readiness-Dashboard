import Card from "../ui/Card.jsx";
import { industrySummaries, scoreTier } from "../../data/metrics.js";
import {
  COLORS,
  INDUSTRY_COLORS,
  INDUSTRY_ORDER,
  TIER_COLORS,
} from "../../theme/colors.js";

export default function IndustryCards({ companies }) {
  const rows = industrySummaries(companies, INDUSTRY_ORDER);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {rows.map((row, i) => (
        <Card
          key={row.industry}
          accent={INDUSTRY_COLORS[row.industry]}
          delay={i * 0.05}
          className="px-4 py-4"
        >
          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: INDUSTRY_COLORS[row.industry] }}
            />
            {row.industry}
          </p>
          <p
            className="mt-2 font-mono text-2xl"
            style={{
              color:
                row.avgScore100 == null
                  ? COLORS.ink
                  : TIER_COLORS[scoreTier(row.avgScore100, 100)],
            }}
          >
            {row.avgScore100 == null ? "–" : row.avgScore100.toFixed(1)}
          </p>
          <p className="text-[10px] text-muted">avg readiness (0–100)</p>
          <p className="mt-2 truncate text-[11px] text-muted">
            {row.count} {row.count === 1 ? "company" : "companies"} · leads{" "}
            <span className="text-ink" title={row.topCompany ?? undefined}>
              {row.topCompany}
            </span>
          </p>
        </Card>
      ))}
    </div>
  );
}
