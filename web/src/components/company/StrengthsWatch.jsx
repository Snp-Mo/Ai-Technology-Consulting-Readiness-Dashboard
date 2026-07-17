import Card from "../ui/Card.jsx";
import { categoryHighlights } from "../../data/metrics.js";
import { COLORS } from "../../theme/colors.js";

function HighlightList({ items, accentColor, emptyLabel }) {
  if (items.length === 0) {
    return <p className="mt-3 text-xs text-muted">{emptyLabel}</p>;
  }
  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li key={item.field}>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-medium text-ink">{item.label}</span>
            <span
              className="shrink-0 font-mono text-[11px]"
              style={{ color: accentColor }}
            >
              {item.value}/5
            </span>
          </div>
          {item.note ? (
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
              {item.note}
            </p>
          ) : (
            <p className="mt-0.5 text-[11px] italic text-muted/70">
              Needs review — source note unavailable.
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function StrengthsWatch({ company, delay = 0 }) {
  const highlights = categoryHighlights(company);
  const strengths = highlights.filter((h) => h.kind === "strength");
  const watch = highlights.filter((h) => h.kind === "watch");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card accent={COLORS.good} delay={delay} className="p-5">
        <h3 className="text-sm font-semibold">Strengths</h3>
        <p className="mt-0.5 text-[10px] text-muted">Categories scoring 4–5</p>
        <HighlightList
          items={strengths}
          accentColor={COLORS.good}
          emptyLabel="No category reached a strength-level score."
        />
      </Card>
      <Card accent={COLORS.bad} delay={delay + 0.05} className="p-5">
        <h3 className="text-sm font-semibold">Watch areas</h3>
        <p className="mt-0.5 text-[10px] text-muted">Categories scoring 1–3</p>
        <HighlightList
          items={watch}
          accentColor={COLORS.bad}
          emptyLabel="No category fell into the watch range."
        />
      </Card>
    </div>
  );
}
