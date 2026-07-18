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
- Remaining: none — all 5 core dashboard pages (Executive Overview, Industry Comparison, Company Deep Dive, GRC & Risk View, Recommendations) are complete as of the Jul 17 sessions logged below.
- Not yet built: the Compare tool and loading/empty-state polish discussed and mocked up in chat, deliberately deprioritized in favor of finishing the 5 core pages first while Fable 5 access was available.

## Session: Jul 17, 2026 — Company Deep Dive built

- **Company Deep Dive (`/companies`) is complete**, built by Claude Code from a text spec (same pattern as prior pages), verified in-browser via the established playwright-core + system Chrome pattern (screenshots, console-error checks, sidebar-sync assertion). Executive Overview, Industry Comparison, and Company Deep Dive are now done; GRC & Risk View and Recommendations remain as stubs.
- **Selector design**: search-as-you-type input backed by a native `<datalist>`, reading/writing the global `company` filter — picking a company here updates the sidebar `<select>` and vice versa (verified). The candidate list respects the other active filters (industry / risk tier / min readiness); if the selected company is excluded by those filters, the page shows an explicit "hidden by filters" card instead of silently blanking.
- **Strengths / watch areas are derived, not hand-written**: category score >= 4 = strength, <= 3 = watch area, with a first-sentence pull (~150 chars) from that category's Notes column via new `metrics.js` helpers (`noteHighlight()`, `categoryHighlights()`, `notesField` added to `CATEGORY_FIELDS`).
- **"Needs review" fallback for bad source data**: one empty note (Kaiser cybersecurity) and five mid-word-truncated notes (UnitedHealth governance, CVS/Providence/Google implementation complexity, UK Gov automation) are detected — a lowercase first character reliably flags the truncations — and render as "Needs review — source note unavailable" instead of broken text. These six cells are also a **data-fix item for the team dataset** (Ahmed/Fahima), not just a UI workaround.
- **Open question for team**: `scoreTier` treats all six categories as higher-is-better, so a high Implementation Complexity score currently reads as a *strength*. Per the blueprint, that category measures friction (regulation, legacy systems, org size) — a high score arguably belongs in watch areas. Needs a decision against the v0.2 scoring framework wording before inverting it in the UI; deferred, not forgotten.
- **Workflow fix**: two "site won't load" scares this session were both just the Vite dev server not running (once after a restart, once because Claude Code `pkill`ed it at session end during cleanup). Rule added going forward: Claude Code should leave the dev server running at session end unless asked to stop it.
- Session also hit Fable 5 usage credits mid-build; finished on Opus without issue — consistent with the "Fable for foundational, Opus/Sonnet for pattern-following page builds" model strategy.

## Session: Jul 17, 2026 — GRC & Risk View built

- **GRC & Risk View (`/grc`) is complete**, built by Claude Code (started on Fable 5, finished on Opus after hitting Fable 5 usage credits mid-build — consistent with the established "Fable for foundational, Opus/Sonnet for pattern-following page builds" model strategy). Executive Overview, Industry Comparison, Company Deep Dive, and GRC & Risk View are now done; only Recommendations remains as a stub.
- **Five new components** in `src/components/grc/`: `GrcKpiRow.jsx` (Avg Privacy/Cybersecurity/Governance scores, High-Risk Companies count, Needs-Review Signals count), `RiskTierBreakdown.jsx` (horizontal bar of low/moderate/high `riskTier` counts), `GrcCategoryBars.jsx` (grouped bars of Privacy/Cyber/Governance averages by industry, same pattern as `IndustryCategoryBars.jsx`), `RiskTable.jsx` (top 10 companies ranked by the existing GRC risk index), and `RiskSignals.jsx` (feed of watch-tier privacy/cyber/governance notes).
- **Reused, not reimplemented**: the GRC risk index formula (`6 − mean(privacy, cyber, governance)`), which already existed for the Executive Overview scatter's y-axis, was reused as-is for the risk table ranking rather than recalculated. The watch-tier signal detection reuses `categoryHighlights()`'s null-note logic from Deep Dive, so Kaiser's empty cybersecurity note and the other known-bad notes get the same "Needs review — source note unavailable" fallback instead of a second implementation.
- **Scope decision**: Implementation Complexity is deliberately excluded from this page, per the blueprint's GRC page spec (privacy/cybersecurity/governance/risk level only) — kept separate from the still-open Deep Dive question about whether high complexity should read as a risk signal.
- **Verification** (playwright-core + system Chrome, same pattern as prior pages): zero console errors. KPIs read Avg Privacy 3.4, Avg Cybersecurity 3.5, Avg Governance 4.1, 1 high-risk company (Oracle, risk index 4.67), 1 needs-review signal (Kaiser). Risk tier breakdown: 16 low / 33 moderate / 1 high. 63 total watch-tier signals across the 50 companies. Empty state confirmed for Healthcare + High risk, with Clear Filters restoring the page.
- `web/CLAUDE.md`'s page inventory was updated to mark GRC & Risk View DONE. Nothing was committed to GitHub at session end — first commit covering Deep Dive + GRC is still pending.

## Session: Jul 17, 2026 — Recommendations built, all 5 core pages complete

- **Recommendations (`/recommendations`) is complete**, the last of the 5 core dashboard pages. Built by Claude Code on Fable 5. Executive Overview, Industry Comparison, Company Deep Dive, GRC & Risk View, and Recommendations are all now done — the web dashboard track has reached feature parity with the blueprint's 5-page requirement.
- **Four new components** in `src/components/recommendations/`: `RecKpiRow.jsx` (Reviewed Recommendations, Avg Automation Opportunity, Quick-Win Companies), `OpportunityLeaderboard.jsx` (top 10 by automation opportunity, ties broken by lower complexity then readiness), `PrioritySplit.jsx` (Quick wins vs Longer-term bets chip cards), `RecommendationFeed.jsx` (per-company recommendation text, industry-colored left border).
- **Two spec rules didn't survive contact with the real data and were adjusted, both noted in `web/CLAUDE.md`'s Key decisions**:
  - *Quick-win threshold*: the originally proposed `implementationComplexityScore <= 2` matches zero companies — the dataset's complexity floor is 3 (distribution: 3→8, 4→27, 5→15). Final rule is `automationOpportunityScore === 5 && implementationComplexityScore <= 3`, giving 5 quick wins (Microsoft, Google, Amazon, Meta, Nvidia) against 32 longer-term bets.
  - *"Reviewed" status check*: `aiOutputReviewStatus` is long free text describing each company's own AI governance process, never the literal string "Reviewed" — an exact-match check would have counted 0 reviewed companies. New `isRecommendationReviewed()` helper in `metrics.js` tests `/\breviewed\b/i` instead: 44 of 50 rows confirm review; the 6 that don't (Kaiser, UnitedHealth, Providence, HCA Healthcare, Elevance Health, CommonSpirit — all Healthcare) describe internal review processes rather than confirming the AI output itself was reviewed, and get the "Needs review — recommendation not yet reviewed" fallback.
  - Both are a good illustration of the broader pattern this build has hit repeatedly: written specs assume clean categorical data, and the real CSV (scored/labeled by Ahmed and Fahima across many sessions) needs a data-driven check before a threshold or status match gets implemented, not just an assumption.
- **Verification** (playwright-core + system Chrome, same pattern as prior pages): zero console errors. KPIs read 44/50 reviewed, 4.7 avg automation opportunity, 5 quick wins. Leaderboard led by Microsoft/Google/Nvidia. Exactly 6 needs-review fallbacks render. Empty state confirmed for Healthcare + High risk.
- `web/CLAUDE.md`'s page inventory was updated to mark Recommendations DONE and note all 5 core pages complete. Nothing was committed to GitHub at session end — Mohamed commits this one personally.
