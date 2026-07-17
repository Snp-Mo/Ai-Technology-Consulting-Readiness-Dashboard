export default function TabSwitcher({ tabs, active, onChange }) {
  return (
    <div
      role="tablist"
      className="flex gap-1 rounded border border-white/10 p-0.5"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          type="button"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={`rounded px-3 py-1 text-[11px] transition-colors ${
            active === tab
              ? "bg-accent/20 font-semibold text-ink"
              : "text-muted hover:text-ink"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
