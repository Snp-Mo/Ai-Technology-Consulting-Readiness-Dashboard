import { useEffect, useId, useState } from "react";

/**
 * Search-as-you-type company picker backed by a native <datalist>. It reads
 * and writes the global `company` filter, so choosing here also updates the
 * sidebar and vice versa. `candidates` is the list already narrowed by the
 * other active filters (industry / risk / min readiness), so the picker never
 * offers a company the current filters would exclude.
 */
export default function CompanySelector({ candidates, value, onSelect }) {
  const listId = useId();
  const [query, setQuery] = useState(value);

  // Keep the input in sync when the company filter changes elsewhere (sidebar,
  // Clear Filters). Only the committed value flows in — partial typing stays.
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const names = candidates.map((c) => c.companyName);

  function handleChange(next) {
    setQuery(next);
    if (next === "") {
      onSelect("");
    } else if (names.includes(next)) {
      onSelect(next);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label className="relative flex-1 max-w-md">
        <span className="sr-only">Search companies</span>
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="m20 20-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          role="combobox"
          list={listId}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search a company…"
          autoComplete="off"
          className="w-full rounded border border-white/10 bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent"
        />
        <datalist id={listId}>
          {names.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>
      {value && (
        <button
          type="button"
          onClick={() => onSelect("")}
          className="rounded border border-accent/40 px-3 py-2 text-xs text-accent transition-colors hover:bg-accent/10"
        >
          Clear
        </button>
      )}
    </div>
  );
}
