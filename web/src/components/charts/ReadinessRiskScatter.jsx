import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { grcRiskIndex } from "../../data/metrics.js";
import {
  COLORS,
  INDUSTRY_COLORS,
  INDUSTRY_ORDER,
} from "../../theme/colors.js";
import { AXIS_TICK, TooltipCard } from "./chartTheme.jsx";

const BASE_RADIUS = 5;
const RADIUS_PER_EXTRA = 2;

/**
 * The dataset's coordinates are heavily quantized, so many companies share an
 * exact (readiness, risk) point. Group per industry-coordinate and encode the
 * stack size in the dot radius; `allAtCoord` carries every company at the
 * coordinate (across industries) for the tooltip.
 */
function groupPoints(companies) {
  const byCoord = new Map();
  for (const c of companies) {
    const x = c.score0to100;
    const y = grcRiskIndex(c);
    if (x == null || y == null) continue;
    const key = `${x},${y}`;
    if (!byCoord.has(key)) byCoord.set(key, { x, y, members: [] });
    byCoord.get(key).members.push({
      name: c.companyName,
      industry: c.industry,
    });
  }

  const byIndustry = new Map();
  for (const { x, y, members } of byCoord.values()) {
    const industries = new Map();
    for (const m of members) {
      if (!industries.has(m.industry)) industries.set(m.industry, []);
      industries.get(m.industry).push(m.name);
    }
    for (const [industry, names] of industries) {
      if (!byIndustry.has(industry)) byIndustry.set(industry, []);
      byIndustry.get(industry).push({
        x,
        y,
        industry,
        count: names.length,
        allAtCoord: members,
      });
    }
  }
  return byIndustry;
}

function StackedDot({ cx, cy, fill, payload }) {
  if (cx == null || cy == null) return null;
  const r = BASE_RADIUS + RADIUS_PER_EXTRA * (payload.count - 1);
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={COLORS.surface}
      strokeWidth={2}
    />
  );
}

function ScatterTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <TooltipCard>
      <ul className="mb-1.5 space-y-0.5">
        {point.allAtCoord.map(({ name, industry }) => (
          <li key={name} className="flex items-center gap-1.5 text-ink">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: INDUSTRY_COLORS[industry] }}
            />
            {name}
          </li>
        ))}
      </ul>
      <p className="text-muted">
        Readiness <span className="font-mono text-ink">{point.x}</span>
      </p>
      <p className="text-muted">
        GRC risk <span className="font-mono text-ink">{point.y}</span>
      </p>
    </TooltipCard>
  );
}

export default function ReadinessRiskScatter({ companies }) {
  const byIndustry = groupPoints(companies);
  const series = INDUSTRY_ORDER.filter((ind) => byIndustry.has(ind));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
        <CartesianGrid stroke={COLORS.grid} />
        <XAxis
          type="number"
          dataKey="x"
          name="Readiness"
          domain={[35, 100]}
          ticks={[40, 50, 60, 70, 80, 90, 100]}
          tick={AXIS_TICK}
          axisLine={{ stroke: COLORS.grid }}
          tickLine={false}
          label={{
            value: "Readiness score (0–100)",
            position: "insideBottom",
            offset: -2,
            fill: COLORS.muted,
            fontSize: 10,
          }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="GRC risk"
          domain={[0.5, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tick={AXIS_TICK}
          axisLine={false}
          tickLine={false}
          label={{
            value: "GRC risk index",
            angle: -90,
            position: "insideLeft",
            offset: 24,
            fill: COLORS.muted,
            fontSize: 10,
          }}
        />
        <Tooltip
          content={<ScatterTooltip />}
          cursor={{ stroke: COLORS.grid, strokeDasharray: "3 3" }}
        />
        {series.map((industry) => (
          <Scatter
            key={industry}
            name={industry}
            data={byIndustry.get(industry)}
            fill={INDUSTRY_COLORS[industry]}
            shape={<StackedDot />}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
