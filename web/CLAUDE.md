# AI Readiness Dashboard (web/)

React 19 + Vite 8 + Tailwind v4 dashboard visualizing AI readiness scores for 50 companies across 5 industries, loaded from `public/data/companies.csv`. Dev: `npm run dev` (port 5173) · lint: `npm run lint` (oxlint) · build: `npm run build`.

## Design system

Dark theme only. Tokens live in **two places that must stay in sync**: `src/index.css` (`@theme`, for Tailwind utilities) and `src/theme/colors.js` (JS constants, because Recharts/Nivo need literal values).

- Background `#14161C` (`bg-canvas`) · card surface `#1C1F27` (`bg-surface`)
- Text `#E7E6E2` (`text-ink`) · secondary `#8B8D96` (`text-muted`) · UI chrome/nav accent `#6B84A3` (`accent`)
- Status colors, used consistently for all score-related values: good `#4CAF7D`, moderate `#E0A83E`, bad/high-risk `#E0654F` (`TIER_COLORS`)
- Industry colors (fixed order, `INDUSTRY_ORDER`/`INDUSTRY_COLORS`): Technology `#5B8DEF`, Healthcare `#4FB88A`, Finance `#A78BFA`, Consulting `#E8965A`, Government `#95A5BC`
- Fonts: Sora (headers/body, default `font-sans`), JetBrains Mono for **all numeric values** (`font-mono`, tabular-nums via index.css)

Component patterns:
- **Card** (`src/components/ui/Card.jsx`): surface bg, 2px left border in a semantic color (`accent` prop), border-radius 0 on the left / rounded right (`rounded-r-lg`), framer-motion fade-up on mount, CSS hover lift (`.card-lift` in index.css). All motion respects `prefers-reduced-motion` (`useReducedMotion` + media query). Recharts' internal animations are disabled (`isAnimationActive={false}`) because Recharts ignores reduced-motion; card fade-up provides the load motion.
- Loading skeletons: pulsing blocks (`animate-pulse motion-reduce:animate-none`), no shimmer gradients (`src/components/ui/Skeleton.jsx`).
- `EmptyState.jsx` (message + Clear Filters) renders when filters match zero companies.

## Data layer

- **`src/data/loadCompanies.js`** — `loadCompanies()`: fetches/parses the CSV with PapaParse, maps the 27 columns to camelCase keys, converts the 8 score columns to numbers, drops blank separator rows (rows without `company_name` — they exist *between* industry groups, not just at the end) → exactly 50 companies. Includes a mojibake-repair map (`â€™` etc.) that is a no-op on the current file (it's valid UTF-8) but protects against bad re-saves.
- **`src/data/metrics.js`** — pure functions: `riskTier(c)`, `scoreTier(value, max)` (5-scale: ≥4 good / ≥3 warn; 100-scale: ≥75 / ≥55), `grcRiskIndex(c)`, `categoryAverages`, `industryCategoryMatrix` (Nivo shape), `topCompanies`, `kpis`, `latestCheckedDate` (parses M/D/YY).
- **`src/context/DashboardContext.jsx`** — loads the CSV once; holds **global** filter state `{industry, company, minReadiness, riskTier}` shared by all routes; exposes `filteredCompanies`, `setFilter`, `clearFilters`, `hasActiveFilters`, `loading`, `error` via `useDashboard()`.

## Pages

Routing in `src/main.jsx`; `src/App.jsx` = layout (fixed 168px sidebar + main). `src/components/layout/Sidebar.jsx` has nav, industry legend, the 4 filters + Clear Filters, and a footer showing the latest Last Checked Date.

- **Executive Overview (`/`, `src/pages/ExecutiveOverview.jsx`) — DONE.** KPI row (`KpiRow.jsx`: Companies Analyzed, Avg AI Readiness, High Risk, High Opportunity, Industries Covered), chart card (`ChartPanel.jsx` with Bar/Scatter/Heatmap tab switcher → `src/components/charts/`), top-8 performers list (`TopCompanies.jsx`).
- **STUBS still to build** (all render `StubPage.jsx`): Industry Comparison (`/industries`), Company Deep Dive (`/companies`), GRC & Risk View (`/grc`), Recommendations (`/recommendations`). The CSV's long note/summary/recommendation text fields are so far unused — they're the natural material for Deep Dive and Recommendations.

## Key decisions

- **GRC risk index** (scatter y-axis): `6 − mean(privacyScore, cybersecurityScore, governanceScore)`. The CSV's Risk Level column is free text, not numeric — user chose this derived axis.
- **High Opportunity KPI**: `automationOpportunityScore === 5` (37 of 50). Originally `>= 4`, but every company scores 4–5 so that showed 50/50 for any filter; changed to `=== 5` by user decision. *(Already applied.)*
- **riskTier normalization** (7 free-text Risk Level values → low/moderate/high): check `"high risk"` → high **first**, then `"moderate"` → moderate, then `"low risk"|"lower risk"|"high readiness"` → low, default moderate. Order matters: "Moderate-high readiness…" contains "high readiness" and must hit the moderate check first. Only Oracle is high.
- **Scatter overlap handling**: coordinates are heavily quantized (x in 2.5-pt steps, y in thirds), so many companies share exact points (e.g. PwC/EY/KPMG/Capgemini all at 63, 2.67). Dots are grouped per industry-coordinate with radius `5 + 2×(count−1)`; tooltip lists **all** companies at the coordinate across industries. Caption under the chart explains the size encoding. Cross-industry stacks (e.g. Visa/Mastercard/DoD at 95, 1.33) still overlap positionally but are fully discoverable via tooltip.
- **Scatter axes tightened** to x [35, 100], y [0.5, 5] (data range: x 42.5–98, y 1–4.67); chart area is `h-72`.
- **Government color** was `#9CA3AF`, changed to `#95A5BC` per the dataviz palette validator (old pair Government↔Consulting failed the normal-vision separation floor; new passes). *(Already applied.)* Validator still flags the palette's lightness band and the Government chroma floor — accepted brand trade-offs; identity is always backed by labels/tooltips.

## Data quirks

- Every company has `automationOpportunityScore` 4 or 5 — the dataset skews high.
- UnitedHealth's `governanceNotes` starts mid-word ("itedHealth…") — source-data truncation, not a parse bug. Kaiser's `cybersecurityNotes` is empty.
- `lastCheckedDate` is M/D/YY (currently all 7/5/26).

## Known issues / notes

- oxlint emits non-blocking `react(only-export-components)` fast-refresh warnings (files exporting components + constants) — accepted.
- Build warns about a ~950 kB chunk (Recharts + Nivo); consider route-level code-splitting once the remaining pages have charts.
- Browser verification pattern: dev server + `playwright-core` (dev dep) driving system Chrome — see scratchpad scripts from past sessions; no bundled browser download needed.
