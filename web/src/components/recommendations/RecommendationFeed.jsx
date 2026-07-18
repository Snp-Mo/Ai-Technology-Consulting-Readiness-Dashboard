import Card from "../ui/Card.jsx";
import { isRecommendationReviewed } from "../../data/metrics.js";
import { COLORS, INDUSTRY_COLORS } from "../../theme/colors.js";

/**
 * One entry per filtered company with its AI Recommendation text. Entries
 * whose review status doesn't confirm the outputs were reviewed (or whose
 * recommendation is blank) show the same needs-review fallback pattern as the
 * GRC risk-signal cards.
 */
export default function RecommendationFeed({ companies, delay = 0 }) {
  return (
    <Card delay={delay} className="p-5">
      <h2 className="text-sm font-semibold">AI recommendations</h2>
      <p className="mt-0.5 text-[10px] text-muted">
        Generated recommendation per company; entries without a confirmed
        output review are held back pending review
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {companies.map((c) => {
          const industryColor = INDUSTRY_COLORS[c.industry] ?? COLORS.accent;
          const reviewed =
            isRecommendationReviewed(c) && (c.aiRecommendation ?? "") !== "";
          return (
            <li
              key={c.companyName}
              className="rounded-r border-l-2 bg-white/[0.03] p-3"
              style={{ borderLeftColor: industryColor }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-ink">
                  {c.companyName}
                </span>
                <span
                  className="shrink-0 text-[10px] font-medium"
                  style={{ color: industryColor }}
                >
                  {c.industry}
                </span>
              </div>
              {reviewed ? (
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  {c.aiRecommendation}
                </p>
              ) : (
                <p className="mt-1.5 text-[11px] italic text-muted/70">
                  Needs review — recommendation not yet reviewed.
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
