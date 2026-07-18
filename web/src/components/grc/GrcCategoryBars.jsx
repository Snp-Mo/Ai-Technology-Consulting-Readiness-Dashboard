import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { GRC_FIELDS, mean } from "../../data/metrics.js";
import {
  COLORS,
  INDUSTRY_COLORS,
  INDUSTRY_ORDER,
} from "../../theme/colors.js";
import { AXIS_TICK, AXIS_TICK_TEXT, TooltipCard } from "../charts/chartTheme.jsx";

function buildData(companies, industries) {
  return GRC_FIELDS.map(({ field, label }) => {
    const row = { category: label };
    for (const industry of industries) {
      const avg = mean(
        companies.filter((c) => c.industry === industry).map((c) => c[field]),
      );
      row[industry] = avg == null ? null : Math.round(avg * 100) / 100;
    }
    return row;
  });
}

function GroupedTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <TooltipCard>
      <p className="mb-1 text-muted">{label}</p>
      <ul className="space-y-0.5">
        {payload.map((entry) => (
          <li key={entry.name} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: INDUSTRY_COLORS[entry.name] }}
            />
            <span className="text-muted">{entry.name}</span>
            <span className="ml-auto pl-3 font-mono text-ink">
              {entry.value?.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </TooltipCard>
  );
}

/** Grouped bars of average Privacy / Cybersecurity / Governance per industry. */
export default function GrcCategoryBars({ companies }) {
  const industries = INDUSTRY_ORDER.filter((ind) =>
    companies.some((c) => c.industry === ind),
  );
  const data = buildData(companies, industries);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        barGap={2}
        barCategoryGap="24%"
        margin={{ top: 8, right: 8, bottom: 0, left: -24 }}
      >
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
        <Tooltip content={<GroupedTooltip />} cursor={{ fill: "#FFFFFF0A" }} />
        {industries.map((industry) => (
          <Bar
            key={industry}
            dataKey={industry}
            fill={INDUSTRY_COLORS[industry]}
            maxBarSize={14}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
