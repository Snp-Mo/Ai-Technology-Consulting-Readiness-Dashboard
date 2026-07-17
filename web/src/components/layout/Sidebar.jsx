import { NavLink } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext.jsx";
import { latestCheckedDate, RISK_TIER_LABELS } from "../../data/metrics.js";
import { INDUSTRY_ORDER, INDUSTRY_COLORS } from "../../theme/colors.js";

const NAV_ITEMS = [
  { to: "/", label: "Executive Overview" },
  { to: "/industries", label: "Industry Comparison" },
  { to: "/companies", label: "Company Deep Dive" },
  { to: "/grc", label: "GRC & Risk View" },
  { to: "/recommendations", label: "Recommendations" },
];

function SectionLabel({ children }) {
  return (
    <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
      {children}
    </p>
  );
}

function FilterSelect({ label, value, onChange, children }) {
  return (
    <label className="block px-4">
      <span className="mb-1 block text-[10px] text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-white/10 bg-canvas px-1.5 py-1 text-[11px] text-ink outline-none focus:border-accent"
      >
        {children}
      </select>
    </label>
  );
}

export default function Sidebar() {
  const { companies, filters, setFilter, clearFilters, hasActiveFilters } =
    useDashboard();

  const companyOptions = companies
    .filter((c) => !filters.industry || c.industry === filters.industry)
    .map((c) => c.companyName);

  const footerDate = latestCheckedDate(companies);

  return (
    <aside className="fixed inset-y-0 left-0 flex w-[168px] flex-col overflow-y-auto border-r border-white/5 bg-surface">
      <div className="border-l-2 border-accent px-4 py-5">
        <p className="text-[13px] font-bold leading-tight">
          AI Readiness
        </p>
        <p className="text-[11px] text-muted">Consulting Dashboard</p>
      </div>

      <nav className="mt-1 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `border-l-2 px-4 py-2 text-[11px] leading-snug transition-colors ${
                isActive
                  ? "border-accent bg-accent/10 font-semibold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 space-y-2">
        <SectionLabel>Industries</SectionLabel>
        <ul className="space-y-1 px-4">
          {INDUSTRY_ORDER.map((industry) => (
            <li
              key={industry}
              className="flex items-center gap-2 text-[11px] text-muted"
            >
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: INDUSTRY_COLORS[industry] }}
              />
              {industry}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-3">
        <SectionLabel>Filters</SectionLabel>
        <FilterSelect
          label="Industry"
          value={filters.industry}
          onChange={(v) => {
            setFilter("industry", v);
            setFilter("company", "");
          }}
        >
          <option value="">All industries</option>
          {INDUSTRY_ORDER.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label="Company"
          value={filters.company}
          onChange={(v) => setFilter("company", v)}
        >
          <option value="">All companies</option>
          {companyOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label="AI Readiness Score"
          value={String(filters.minReadiness)}
          onChange={(v) => setFilter("minReadiness", Number(v))}
        >
          <option value="0">Any score</option>
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n === 5 ? "5 only" : `${n} and above`}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label="Risk Level"
          value={filters.riskTier}
          onChange={(v) => setFilter("riskTier", v)}
        >
          <option value="">All levels</option>
          {Object.entries(RISK_TIER_LABELS).map(([tier, label]) => (
            <option key={tier} value={tier}>
              {label}
            </option>
          ))}
        </FilterSelect>

        {hasActiveFilters && (
          <div className="px-4">
            <button
              type="button"
              onClick={clearFilters}
              className="w-full rounded border border-accent/40 py-1 text-[11px] text-accent transition-colors hover:bg-accent/10"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="mt-auto px-4 py-4">
        <p className="text-[10px] leading-relaxed text-muted">
          {footerDate ? `Data last checked ${footerDate}` : "Loading data…"}
        </p>
      </div>
    </aside>
  );
}
