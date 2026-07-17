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
- Loading skeletons: pulsing blocks (`animate-pulse motion-reduce:animate-none`), no shimmer gradients (`src/components/ui/Skeleton.jsx` — one named export per page layout: `OverviewSkeleton`, `IndustriesSkeleton`, `DeepDiveSkeleton`).
- `EmptyState.jsx` (message + Clear Filters) renders when filters match zero companies.

## Data layer

- **`src/data/loadCompanies.js`** — `loadCompanies()`: fetches/parses the CSV with PapaParse, maps the 27 columns to camelCase keys, converts the 8 score columns to numbers, drops blank separator rows (rows without `company_name` — they exist *between* industry groups, not just at the end) → exactly 50 companies. Includes a mojibake-repair map (`â€™` etc.) that is a no-op on the current file (it's valid UTF-8) but protects against bad re-saves.
- **`src/data/metrics.js`** — pure functions: `riskTier(c)`, `scoreTier(value, max)` (5-scale: ≥4 good / ≥3 warn; 100-scale: ≥75 / ≥55), `grcRiskIndex(c)`, `categoryAverages`, `industryCategoryMatrix` (Nivo shape), `topCompanies`, `kpis`, `latestCheckedDate` (parses M/D/YY). `CATEGORY_FIELDS` carries a `notesField` per category (mapping each score to its Notes column) alongside `field`/`label`. `noteHighlight(note, maxLen=150)` condenses a long Notes field to a first-sentence pull, returning `null` when the note is empty **or** source-truncated — the truncation heuristic: a lowercase first character flags mid-word truncation (e.g. "itedHealth…", "mplementation…"), since a clean note always opens with a capital or digit. `categoryHighlights(c)` returns per-category `{field, label, value, kind, note}` where `kind` is `"strength"` (score ≥4), `"watch"` (≤3), or `null`, and `note` is the `noteHighlight` pull.
- **`src/context/DashboardContext.jsx`** — loads the CSV once; holds **global** filter state `{industry, company, minReadiness, riskTier}` shared by all routes; exposes `filteredCompanies`, `setFilter`, `clearFilters`, `hasActiveFilters`, `loading`, `error` via `useDashboard()`.

## Pages

Routing in `src/main.jsx`; `src/App.jsx` = layout (fixed 168px sidebar + main). `src/components/layout/Sidebar.jsx` has nav, industry legend, the 4 filters + Clear Filters, and a footer showing the latest Last Checked Date.

- **Executive Overview (`/`, `src/pages/ExecutiveOverview.jsx`) — DONE.** KPI row (`KpiRow.jsx`: Companies Analyzed, Avg AI Readiness, High Risk, High Opportunity, Industries Covered), chart card (`ChartPanel.jsx` with Bar/Scatter/Heatmap tab switcher → `src/components/charts/`), top-8 performers list (`TopCompanies.jsx`).
- **Industry Comparison (`/industries`, `src/pages/IndustryComparison.jsx`) — DONE.** Per-industry summary cards (`src/components/industries/IndustryCards.jsx`: avg `score0to100` colored by `scoreTier(v, 100)`, company count, leader; accent = industry color), grouped bar chart of category averages per industry (`src/components/charts/IndustryCategoryBars.jsx`), and a readiness strip plot (`src/components/charts/IndustryReadinessStrip.jsx`: one row per industry, x = `score0to100`, ties collapse into sized dots like the scatter; y-axis `reversed` so rows follow `INDUSTRY_ORDER` top-down). `IndustryLegend` was extracted from ChartPanel into `src/components/charts/IndustryLegend.jsx` and is shared; it's hidden when only one industry is present. `metrics.js` gained `industrySummaries()` and now exports `mean`.
- **Company Deep Dive (`/companies`, `src/pages/CompanyDeepDive.jsx`) — DONE.** Single-company full profile. The page computes a `candidates` list = all companies matching every active filter **except** `company` (industry / minReadiness / riskTier), so the picker never offers a company the other filters would hide; renders the selected company's profile, a "hidden by filters" card when the filter's company is excluded by the others, or a "Select a company" prompt when none is chosen. Components in **`src/components/company/`**:
  - `CompanySelector.jsx` — search-as-you-type input backed by a native `<datalist>`, reading/writing the global `company` filter (so picking here syncs the sidebar and vice versa; a `useEffect` mirrors external filter changes back into the input). Commits only on an exact name match or empty (clear).
  - `CompanyHeader.jsx` — name, industry badge (industry color), size, verification status, last-checked date, `score0to100` colored by `scoreTier(v, 100)`, and a risk badge from `riskTier`; accent = industry color.
  - `Scorecard.jsx` — six horizontal bars (one per `CATEGORY_FIELDS` entry, 1–5), each colored by `scoreTier(value, 5)`.
  - `StrengthsWatch.jsx` — two cards from `categoryHighlights(c)`: strengths (score ≥4, good accent) and watch areas (≤3, bad accent), each item showing the one-sentence `noteHighlight` pull or a **"Needs review — source note unavailable"** fallback when the pull is `null` (empty/truncated note). This is what gracefully handles Kaiser's empty cyber note and UnitedHealth's truncated governance note.
  - `AiNarrative.jsx` — AI Summary and AI Recommendation text cards (each with its own "Needs review" fallback when blank).
  - `SourceLinks.jsx` — the up-to-3 Source URLs, hostname label + external-link icon, `target="_blank" rel="noopener noreferrer"`, blank URLs skipped.
- **STUBS still to build** (all render `StubPage.jsx`): GRC & Risk View (`/grc`), Recommendations (`/recommendations`). The CSV's long note/summary/recommendation text fields feed Deep Dive; Recommendations is their other natural home.

## Key decisions

- **GRC risk index** (scatter y-axis): `6 − mean(privacyScore, cybersecurityScore, governanceScore)`. The CSV's Risk Level column is free text, not numeric — user chose this derived axis.
- **High Opportunity KPI**: `automationOpportunityScore === 5` (37 of 50). Originally `>= 4`, but every company scores 4–5 so that showed 50/50 for any filter; changed to `=== 5` by user decision. *(Already applied.)*
- **riskTier normalization** (7 free-text Risk Level values → low/moderate/high): check `"high risk"` → high **first**, then `"moderate"` → moderate, then `"low risk"|"lower risk"|"high readiness"` → low, default moderate. Order matters: "Moderate-high readiness…" contains "high readiness" and must hit the moderate check first. Only Oracle is high.
- **Scatter overlap handling**: coordinates are heavily quantized (x in 2.5-pt steps, y in thirds), so many companies share exact points (e.g. PwC/EY/KPMG/Capgemini all at 63, 2.67). Dots are grouped per industry-coordinate with radius `5 + 2×(count−1)`; tooltip lists **all** companies at the coordinate across industries. Caption under the chart explains the size encoding. Cross-industry stacks (e.g. Visa/Mastercard/DoD at 95, 1.33) still overlap positionally but are fully discoverable via tooltip.
- **Scatter axes tightened** to x [35, 100], y [0.5, 5] (data range: x 42.5–98, y 1–4.67); chart area is `h-72`.
- **Government color** was `#9CA3AF`, changed to `#95A5BC` per the dataviz palette validator (old pair Government↔Consulting failed the normal-vision separation floor; new passes). *(Already applied.)* Validator still flags the palette's lightness band and the Government chroma floor — accepted brand trade-offs; identity is always backed by labels/tooltips.
- **OPEN QUESTION — Implementation Complexity direction.** Both `scoreTier` and the Deep Dive strengths/watch split treat all six categories as higher-is-better uniformly, so a high `implementationComplexityScore` currently counts as a *strength*. If the team decides high complexity should read as a *risk/watch area* instead, `categoryHighlights` (and possibly `scoreTier` usage for that one field) needs inverted handling. Pending team decision — left uniform for now.

## Data quirks

- Every company has `automationOpportunityScore` 4 or 5 — the dataset skews high.
- UnitedHealth's `governanceNotes` starts mid-word ("itedHealth…") — source-data truncation, not a parse bug. Kaiser's `cybersecurityNotes` is empty.
- `lastCheckedDate` is M/D/YY (currently all 7/5/26).

## Known issues / notes

- oxlint emits non-blocking `react(only-export-components)` fast-refresh warnings (files exporting components + constants) — accepted.
- Build warns about a ~950 kB chunk (Recharts + Nivo); consider route-level code-splitting once the remaining pages have charts.
- Browser verification pattern: dev server + `playwright-core` (dev dep) driving system Chrome — see scratchpad scripts from past sessions; no bundled browser download needed.
- **Workflow: don't kill the dev server at session end unless asked.** The user often keeps `npm run dev` running between sessions; leave it up.
- `docs/web_dashboard_chat_log.md` (referenced for session context) lives on the remote and is maintained separately via Claude.ai — it may be absent from a fresh local clone. **Run `git pull` before committing/pushing** so this file (and other out-of-band updates) merge cleanly.
