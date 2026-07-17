import { ResponsiveHeatMap } from "@nivo/heatmap";
import { industryCategoryMatrix } from "../../data/metrics.js";
import { COLORS, INDUSTRY_ORDER } from "../../theme/colors.js";
import { NIVO_THEME, TooltipCard } from "./chartTheme.jsx";

function hexToRgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function blend(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const mix = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${mix.join(",")})`;
}

// Status ramp over the 1–5 score range: bad → warn → good.
function scoreColor(value) {
  if (value == null) return COLORS.grid;
  const v = Math.max(1, Math.min(5, value));
  return v <= 3
    ? blend(COLORS.bad, COLORS.warn, (v - 1) / 2)
    : blend(COLORS.warn, COLORS.good, (v - 3) / 2);
}

function HeatmapTooltip({ cell }) {
  return (
    <TooltipCard>
      <p className="mb-0.5 text-muted">
        {cell.serieId} · {cell.data.x}
      </p>
      <p className="font-mono text-ink">{cell.data.y?.toFixed(2)} / 5</p>
    </TooltipCard>
  );
}

export default function IndustryCategoryHeatmap({ companies }) {
  const data = industryCategoryMatrix(companies, INDUSTRY_ORDER);
  return (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 24, right: 8, bottom: 8, left: 82 }}
      theme={NIVO_THEME}
      colors={(cell) => scoreColor(cell.data.y)}
      emptyColor={COLORS.grid}
      valueFormat=">-.1f"
      labelTextColor={COLORS.canvas}
      axisTop={{ tickSize: 0, tickPadding: 8 }}
      axisLeft={{ tickSize: 0, tickPadding: 8 }}
      borderWidth={2}
      borderColor={COLORS.surface}
      hoverTarget="cell"
      inactiveOpacity={0.7}
      tooltip={HeatmapTooltip}
      animate={false}
    />
  );
}
