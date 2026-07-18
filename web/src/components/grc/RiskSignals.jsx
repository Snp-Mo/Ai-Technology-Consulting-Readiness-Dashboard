import Card from "../ui/Card.jsx";
import { COLORS } from "../../theme/colors.js";

/**
 * Feed of watch-tier privacy/cybersecurity/governance signals from
 * grcWatchSignals(). Entries with a null note (empty or source-truncated)
 * show the same "Needs review" fallback as the Deep Dive cards.
 */
export default function RiskSignals({ signals, delay = 0 }) {
  return (
    <Card accent={COLORS.bad} delay={delay} className="p-5">
      <h2 className="text-sm font-semibold">Key risk signals</h2>
      <p className="mt-0.5 text-[10px] text-muted">
        Privacy, cybersecurity, and governance categories scoring 1–3 across
        the filtered companies
      </p>
      {signals.length === 0 ? (
        <p className="mt-4 text-xs text-muted">
          No watch-tier GRC signals among the current companies.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {signals.map(({ company, field, label, value, note }) => (
            <li
              key={`${company.companyName}-${field}`}
              className="rounded-r border-l-2 bg-white/[0.03] p-3"
              style={{ borderLeftColor: COLORS.bad }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-ink">
                  {company.companyName}
                </span>
                <span
                  className="shrink-0 font-mono text-[11px]"
                  style={{ color: COLORS.bad }}
                >
                  {value}/5
                </span>
              </div>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-muted">
                {label}
              </p>
              {note ? (
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  {note}
                </p>
              ) : (
                <p className="mt-1.5 text-[11px] italic text-muted/70">
                  Needs review — source note unavailable.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
