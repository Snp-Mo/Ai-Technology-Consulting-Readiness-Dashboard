# Web Dashboard - Chat Planning Log

This file logs decisions and history from the Claude.ai planning conversation (design direction, tooling setup, review cycles) that sit alongside the day-to-day build log in `web/CLAUDE.md`. Read **both**: `web/CLAUDE.md` for current codebase state, this file for the reasoning and history behind it.

## Why a website (scope note)

Team was blocked on Power BI, pivoted to building an interactive React web dashboard instead, in parallel with (not replacing) the Version 1 blueprint's dashboard requirement. Built using Claude Fable 5 via Claude Code (VS Code extension) while free-tier access lasted (through Jul 19, 2026).

## Local environment setup (resolved issues)

- Hit a corrupted/root-owned npm cache (`EACCES`, `EEXIST` errors from a prior `sudo npm install`). Fixed with `sudo chown -R $(whoami) ~/.npm` then `npm cache clean --force`.
- Repo cloned fresh to `~/Ai-Technology-Consulting-Readiness-Dashboard`; app scaffolded in a new `web/` subfolder via `npm create vite@latest web -- --template react`.
- Stack: Vite + React 19, **Tailwind CSS v4** (CSS-first `@theme` config, not the old `init -p`/postcss workflow), Framer Motion, Recharts, `@nivo/heatmap`, PapaParse, `react-router-dom`, `@fontsource-variable/sora` + `@fontsource-variable/jetbrains-mono`.
- Dataset copied to `web/public/data/companies.csv`. Suspected mojibake in browser preview turned out to be a false alarm (Safari's raw-text viewer mis-guessing encoding) - the CSV itself is valid UTF-8; `loadCompanies.js` still carries a mojibake-repair map as a no-op safety net.

## Design system (settled direction)

Starting point was a colorful/neon reference dashboard image; explicitly steered away from that toward a muted, "quiet analyst" aesthetic to avoid generic/AI-generated visual tells (near-black + single neon accent).

- Dark theme: background `#14161C`, card surface `#1C1F27`, text `#E7E6E2`, muted text `#8B8D96`, UI/nav accent `#6B84A3`.
- Status colors used consistently for score/risk values: good `#4CAF7D`, moderate `#E0A83E`, bad/high-risk `#E0654F`.
- Industry colors: Technology `#5B8DEF`, Healthcare `#4FB88A`, Finance `#A78BFA`, Consulting `#E8965A`, Government `#95A5BC` (changed from initial `#9CA3AF` after the dataviz skill's palette validator flagged it against Consulting orange for normal-vision separation).
- Typography: Sora for headers/body, **JetBrains Mono for all numeric values** (deliberate choice to signal data-seriousness, avoid templated feel).
- Card pattern: surface bg, 2px left-border accent, square left corners / rounded right, Framer Motion fade-up on mount, subtle hover lift, all motion respects `prefers-reduced-motion`.
- Response states treated as first-class: loading skeletons (pulsing blocks, no shimmer), empty states (message + Clear Filters), not an afterthought.
- Mockups iterated live in-chat (Visualizer) before implementation: v1 base layout -> v2 more saturated status/industry colors -> v3 chart-type tab switcher (Bar/Scatter/Heatmap) -> v4 compare-tool + response-state concept. These validated the direction; the real implementation was built independently by Claude Code from a text spec (not copy-pasted from the mockup HTML), by deliberate choice - see "its moment" decision below.

## Key build decisions & fixes

1. **GRC risk index** (scatter y-axis): `6 - mean(privacyScore, cybersecurityScore, governanceScore)`, chosen over raw Implementation Complexity Score or a 3-tier Risk Level mapping because both alternatives produced too few discrete values for a meaningful scatter.
2. **High Opportunity KPI**: started as `automationOpportunityScore >= 4`, but every company in the dataset scores 4 or 5, so it showed 50/50 for any filter combination. Changed to `=== 5` (37/50) to actually differentiate. Worth a team conversation about whether Automation Opportunity scoring is too generous across the board.
3. **riskTier normalization**: 7 free-text Risk Level values collapsed to low/moderate/high; order-sensitive substring matching ("high risk" checked before "moderate" before "high readiness", since "Moderate-high readiness..." contains "high readiness").
4. **Scatter plot overlap bug (found via user QA, not caught in initial build)**: axes are heavily quantized (readiness in 2.5-pt steps, GRC risk index in thirds), so 36 of 50 companies landed on just 14 shared coordinates and rendered as far fewer visible dots than actual data points. Fixed by grouping per industry-coordinate and sizing dot radius by stack count (`5 + 2x(count-1)`), with tooltip listing every company at that coordinate. Axis domains were also tightened to the data's real range (~35-100 / 0.5-5) instead of the full 0-100/1-5, since the dataset's readiness-vs-risk relationship is a tight negative correlation with no companies below ~40 readiness.
5. **"Let it have its moment"**: for the app shell + Executive Overview build, deliberately did NOT hand Claude Code the literal mockup HTML/CSS - gave it the design tokens and a text description instead, to get an independently-reasoned implementation rather than a mechanical copy. Accepted some visual drift from the chat mockups as a tradeoff.

## Claude Code workflow notes (for next session)

- Model: Fable 5 for foundational/architectural work (data layer, shell, chart logic); fine to drop to Sonnet/Opus for repetitive page-building once a pattern is established.
- Mode: Plan Mode for anything foundational (review the full plan before code is written); Auto-Accept once a plan is approved, to avoid per-file approval fatigue on large builds.
- Effort: High for reasoning-heavy work (data parsing, chart logic); Medium/Low fine for repetitive implementation once a pattern exists.
- Verification pattern established and reused: dev server + `playwright-core` (installed as a dev dependency) driving the system-installed Chrome via `executablePath`, since no bundled Playwright browser is installed. Screenshots + console-error checks + targeted DOM assertions (e.g. dot radii, filtered company counts) rather than just eyeballing.
- `CLAUDE.md` lives in `web/` (not repo root) and is the authoritative, continuously-updated source of codebase state - component inventory, function signatures, applied decisions. This file is the narrative/decision history; `web/CLAUDE.md` is the technical reference. Update both at natural session-end points.

## Status as of this log

- Executive Overview: complete (KPI row, Bar/Scatter/Heatmap tab switcher, top performers list, scatter overlap fix, tightened axes).
- Industry Comparison: complete (per-industry summary cards with leader company, grouped bar chart by category, readiness-score-spread scatter by industry row reusing the overlap-sizing pattern).
- Remaining: Company Deep Dive, GRC & Risk View, Recommendations (all currently stub pages). The CSV's long-form notes/summary/recommendation text fields are unused so far - natural material for Deep Dive and Recommendations.
- Not yet built: the Compare tool and loading/empty-state polish discussed and mocked up in chat, deliberately deprioritized in favor of finishing the 5 core pages first while Fable 5 access was available.
