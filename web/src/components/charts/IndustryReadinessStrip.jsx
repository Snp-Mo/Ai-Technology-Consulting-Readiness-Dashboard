import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  COLORS,
  INDUSTRY_COLORS,
  INDUSTRY_ORDER,
} from "../../theme/colors.js";
import { AXIS_TICK, AXIS_TICK_TEXT, TooltipCard } from "./chartTheme.jsx";

const BASE_RADIUS = 5;
const RADIUS_PER_EXTRA = 2;

/**
 * One row per industry, dots at each company's 0–100 readiness score. Scores
 * are quantized (2.5-pt steps), so companies frequently tie; like the
 * scatter, ties collapse into one dot whose radius encodes the count.
 */
function groupByScore(companies, industries) {
  const byIndustry = new Map(industries.map((ind) => [ind, new Map()]));
  for (const c of companies) {
    if (c.score0to100 == null || !byIndustry.has(c.industry)) continue;
    const scores = byIndustry.get(c.industry);
    if (!scores.has(c.score0to100)) {
      scores.set(c.score0to100, {
        x: c.score0to100,
        industry: c.industry,
        names: [],
      });
    }
    scores.get(c.score0to100).names.push(c.companyName);
  }
  return byIndustry;
}

function StripDot({ cx, cy, fill, payload }) {
  if (cx == null || cy == null) return null;
  const r = BASE_RADIUS + RADIUS_PER_EXTRA * (payload.names.length - 1);
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

function StripTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <TooltipCard>
      <p className="mb-0.5 flex items-center gap-1.5 text-muted">
        <span
          aria-hidden
          className="size-2 shrink-0 rounded-full"
          style={{ backgroundColor: INDUSTRY_COLORS[point.industry] }}
        />
        {point.industry}
      </p>
      <ul className="mb-1.5 space-y-0.5">
        {point.names.map((name) => (
          <li key={name} className="text-ink">
            {name}
          </li>
        ))}
      </ul>
      <p className="text-muted">
        Readiness <span className="font-mono text-ink">{point.x}</span>
      </p>
    </TooltipCard>
  );
}

export default function IndustryReadinessStrip({ companies }) {
  const industries = INDUSTRY_ORDER.filter((ind) =>
    companies.some((c) => c.industry === ind),
  );
  const byIndustry = groupByScore(companies, industries);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
        <CartesianGrid stroke={COLORS.grid} horizontal={false} />
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
          type="category"
          dataKey="industry"
          reversed
          allowDuplicatedCategory={false}
          tick={AXIS_TICK_TEXT}
          width={78}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<StripTooltip />}
          cursor={{ stroke: COLORS.grid, strokeDasharray: "3 3" }}
        />
        {industries.map((industry) => (
          <Scatter
            key={industry}
            name={industry}
            data={[...byIndustry.get(industry).values()]}
            fill={INDUSTRY_COLORS[industry]}
            shape={<StripDot />}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
