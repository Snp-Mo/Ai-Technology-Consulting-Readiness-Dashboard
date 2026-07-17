import { COLORS } from "../../theme/colors.js";

export const AXIS_TICK = {
  fill: COLORS.muted,
  fontSize: 11,
  fontFamily: "JetBrains Mono Variable, monospace",
};

export const AXIS_TICK_TEXT = {
  fill: COLORS.muted,
  fontSize: 11,
  fontFamily: "Sora Variable, sans-serif",
};

/** Shared dark tooltip card for Recharts custom tooltips. */
export function TooltipCard({ children }) {
  return (
    <div className="rounded border border-white/10 bg-canvas px-3 py-2 text-xs shadow-lg">
      {children}
    </div>
  );
}

/** Nivo theme matching the dashboard chrome. */
export const NIVO_THEME = {
  text: {
    fill: COLORS.muted,
    fontSize: 11,
    fontFamily: "Sora Variable, sans-serif",
  },
  axis: {
    ticks: { text: { fill: COLORS.muted, fontSize: 11 } },
  },
  labels: {
    text: {
      fontFamily: "JetBrains Mono Variable, monospace",
      fontSize: 11,
    },
  },
};
