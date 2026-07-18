import Card from "../ui/Card.jsx";
import {
  isRecommendationReviewed,
  mean,
  recommendationPriorities,
  scoreTier,
} from "../../data/metrics.js";
import { COLORS, TIER_COLORS } from "../../theme/colors.js";

export default function RecKpiRow({ companies }) {
  const reviewed = companies.filter(isRecommendationReviewed).length;
  const avgOpportunity = mean(
    companies.map((c) => c.automationOpportunityScore),
  );
  const { quickWins } = recommendationPriorities(companies);

  const items = [
    {
      label: "Reviewed Recommendations",
      value: `${reviewed} / ${companies.length}`,
      color: reviewed === companies.length ? COLORS.good : COLORS.warn,
    },
    {
      label: "Avg Automation Opportunity",
      value: avgOpportunity == null ? "–" : avgOpportunity.toFixed(1),
      color:
        avgOpportunity == null
          ? COLORS.ink
          : TIER_COLORS[scoreTier(avgOpportunity)],
    },
    {
      label: "Quick-Win Companies",
      value: quickWins.length,
      color: quickWins.length > 0 ? COLORS.good : COLORS.warn,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map(({ label, value, color }, i) => (
        <Card
          key={label}
          accent={color === COLORS.ink ? undefined : color}
          delay={i * 0.05}
          className="px-4 py-4"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
            {label}
          </p>
          <p className="mt-2 font-mono text-2xl" style={{ color }}>
            {value}
          </p>
        </Card>
      ))}
    </div>
  );
}
