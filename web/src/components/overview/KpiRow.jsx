import Card from "../ui/Card.jsx";
import { kpis, scoreTier } from "../../data/metrics.js";
import { COLORS, TIER_COLORS } from "../../theme/colors.js";

export default function KpiRow({ companies }) {
  const k = kpis(companies);
  const avgColor =
    k.avgReadiness == null ? COLORS.ink : TIER_COLORS[scoreTier(k.avgReadiness)];

  const items = [
    { label: "Companies Analyzed", value: k.count, color: COLORS.ink },
    {
      label: "Avg AI Readiness Score",
      value: k.avgReadiness == null ? "–" : k.avgReadiness.toFixed(1),
      color: avgColor,
    },
    {
      label: "High Risk",
      value: k.highRisk,
      color: k.highRisk > 0 ? COLORS.bad : COLORS.good,
    },
    { label: "High Opportunity", value: k.highOpportunity, color: COLORS.good },
    { label: "Industries Covered", value: k.industries, color: COLORS.ink },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {items.map(({ label, value, color }, i) => (
        <Card key={label} accent={color === COLORS.ink ? undefined : color} delay={i * 0.05} className="px-4 py-4">
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
