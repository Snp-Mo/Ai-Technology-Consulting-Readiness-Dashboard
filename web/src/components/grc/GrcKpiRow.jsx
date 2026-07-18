import Card from "../ui/Card.jsx";
import { GRC_FIELDS, mean, riskTier, scoreTier } from "../../data/metrics.js";
import { COLORS, TIER_COLORS } from "../../theme/colors.js";

export default function GrcKpiRow({ companies, signals }) {
  const averages = GRC_FIELDS.map(({ field, label }) => {
    const avg = mean(companies.map((c) => c[field]));
    return {
      label: `Avg ${label} Score`,
      value: avg == null ? "–" : avg.toFixed(1),
      color: avg == null ? COLORS.ink : TIER_COLORS[scoreTier(avg)],
    };
  });
  const highRisk = companies.filter((c) => riskTier(c) === "high").length;
  const needsReview = signals.filter((s) => s.note == null).length;

  const items = [
    ...averages,
    {
      label: "High-Risk Companies",
      value: highRisk,
      color: highRisk > 0 ? COLORS.bad : COLORS.good,
    },
    {
      label: "Needs-Review Signals",
      value: needsReview,
      color: needsReview > 0 ? COLORS.warn : COLORS.good,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
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
