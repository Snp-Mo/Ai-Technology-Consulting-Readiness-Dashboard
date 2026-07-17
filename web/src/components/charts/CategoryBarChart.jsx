import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { categoryAverages, scoreTier } from "../../data/metrics.js";
import { COLORS, TIER_COLORS } from "../../theme/colors.js";
import { AXIS_TICK, AXIS_TICK_TEXT, TooltipCard } from "./chartTheme.jsx";

function BarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { category, average } = payload[0].payload;
  return (
    <TooltipCard>
      <p className="mb-0.5 text-muted">{category}</p>
      <p className="font-mono text-ink">{average?.toFixed(2)} / 5</p>
    </TooltipCard>
  );
}

export default function CategoryBarChart({ companies }) {
  const data = categoryAverages(companies);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
        <CartesianGrid stroke={COLORS.grid} vertical={false} />
        <XAxis
          dataKey="category"
          tick={AXIS_TICK_TEXT}
          axisLine={{ stroke: COLORS.grid }}
          tickLine={false}
          interval={0}
        />
        <YAxis
          domain={[0, 5]}
          ticks={[0, 1, 2, 3, 4, 5]}
          tick={AXIS_TICK}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<BarTooltip />} cursor={{ fill: "#FFFFFF0A" }} />
        <Bar
          dataKey="average"
          barSize={28}
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        >
          {data.map((d) => (
            <Cell key={d.category} fill={TIER_COLORS[scoreTier(d.average)]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
