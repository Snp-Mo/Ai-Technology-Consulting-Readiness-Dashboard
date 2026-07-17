import Card from "../ui/Card.jsx";
import { CATEGORY_FIELDS, scoreTier } from "../../data/metrics.js";
import { COLORS, TIER_COLORS } from "../../theme/colors.js";

export default function Scorecard({ company, delay = 0 }) {
  return (
    <Card delay={delay} className="p-5">
      <h3 className="text-sm font-semibold">Category scorecard</h3>
      <p className="mt-0.5 text-[10px] text-muted">Each category scored 1–5</p>
      <ul className="mt-4 space-y-3">
        {CATEGORY_FIELDS.map(({ field, label }) => {
          const value = company[field];
          const color = value == null ? COLORS.muted : TIER_COLORS[scoreTier(value, 5)];
          const pct = value == null ? 0 : (value / 5) * 100;
          return (
            <li key={field} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-[11px] text-muted">{label}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </span>
              <span
                className="w-6 shrink-0 text-right font-mono text-xs"
                style={{ color }}
              >
                {value == null ? "–" : value}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
