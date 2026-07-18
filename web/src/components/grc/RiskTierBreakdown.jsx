import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { riskTier, RISK_TIER_LABELS } from "../../data/metrics.js";
import { COLORS, TIER_COLORS } from "../../theme/colors.js";
import { AXIS_TICK, AXIS_TICK_TEXT, TooltipCard } from "../charts/chartTheme.jsx";

const TIER_ORDER = ["low", "moderate", "high"];
const TIER_COLOR = {
  low: TIER_COLORS.good,
  moderate: TIER_COLORS.warn,
  high: TIER_COLORS.bad,
};

function TierTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { label, count } = payload[0].payload;
  return (
    <TooltipCard>
      <p className="text-muted">
        {label} risk ·{" "}
        <span className="font-mono text-ink">
          {count} compan{count === 1 ? "y" : "ies"}
        </span>
      </p>
    </TooltipCard>
  );
}

/** Horizontal bar breakdown of riskTier counts across the filtered companies. */
export default function RiskTierBreakdown({ companies }) {
  const data = TIER_ORDER.map((tier) => ({
    tier,
    label: RISK_TIER_LABELS[tier],
    count: companies.filter((c) => riskTier(c) === tier).length,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        barCategoryGap="30%"
        margin={{ top: 8, right: 32, bottom: 0, left: -8 }}
      >
        <CartesianGrid stroke={COLORS.grid} horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={AXIS_TICK}
          axisLine={{ stroke: COLORS.grid }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={72}
          tick={AXIS_TICK_TEXT}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<TierTooltip />} cursor={{ fill: "#FFFFFF0A" }} />
        <Bar dataKey="count" maxBarSize={18} radius={[0, 2, 2, 0]} isAnimationActive={false}>
          {data.map(({ tier }) => (
            <Cell key={tier} fill={TIER_COLOR[tier]} />
          ))}
          <LabelList
            dataKey="count"
            position="right"
            fill={COLORS.ink}
            fontSize={11}
            fontFamily="JetBrains Mono Variable, monospace"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
