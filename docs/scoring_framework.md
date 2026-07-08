# AI Technology Consulting Readiness Dashboard
## Scoring Framework — v0.2

**Version:** v0.2
**Date:** July 2026
**Status:** Reviewed draft — updated after the Week 3 review and the first full scoring pass (50 companies)
**Project:** AI Technology Consulting Readiness Dashboard
**Primary file path:** `docs/scoring_framework.md`
**Supersedes:** v0.1 Working Draft (May 2026)

> **What changed at a glance:** v0.2 keeps the six categories and the 1–5 scale, but it fixes the biggest problem in v0.1: Implementation Complexity was being added into the score as if "harder = more ready," which is backwards. In v0.2, Implementation Complexity is pulled out of the readiness score and reported as its own risk signal. Readiness is now built from the five categories that all move in the same direction. Risk thresholds stay as placeholders because the current data lands almost everything in one band. See Section 15 for the full changelog.

---

## SCOPE (carried forward from v0.1)

- **5 sectors × 10 companies = 50 companies total.**
- **Sectors:** Healthcare/Biotech, Technology, Finance, Consulting, Government.
- **Status at v0.2:** All five sectors complete, 50/50 companies scored. Government was kept (it was "on probation" in v0.1) because public evidence turned out to be strong enough — UN e-government data, national AI strategies, and published regulatory frameworks gave enough to score on.

The scope restructure history is unchanged from v0.1 and is preserved in the changelog.

---

## 1. Purpose

This framework defines how each company is evaluated across six technology consulting categories using **publicly available information only**.

It helps the team compare companies across AI readiness and technology risk, produce consistent scorecards, feed the Power BI dashboard, identify strengths and gaps, and generate evidence-based consulting recommendations that can be defended in review.

This is a student-built consulting and analytics model for portfolio, learning, and demonstration purposes. It does not produce official company ratings.

---

## 2. Core Scoring Principle

Every score must be based on **visible public evidence**. Sources may include company websites, annual and investor reports, privacy policies, security or trust centers, responsible AI pages, press releases, blog posts, public job postings, published certifications or compliance statements, and reputable public articles or analyst coverage.

Do **not** score on reputation, assumptions, company size, or what the team thinks is probably true. If evidence is missing, unclear, or weak: score lower, mark the category `Needs Review`, and write a short note on what was missing.

---

## 3. Scoring Scale

Each category is scored **1–5**.

| Score | Label | Meaning |
|---:|---|---|
| 1 | Very Weak | Little to no public evidence found |
| 2 | Limited | Some evidence, but vague, incomplete, or weak |
| 3 | Moderate | Clear evidence, but with real gaps |
| 4 | Strong | Consistent, well-documented public evidence |
| 5 | Very Strong | Comprehensive, detailed, leading-practice evidence |

**Scoring rule:** if you cannot explain the score in one clear sentence using public evidence, the score is probably too high or needs review.

---

## 4. Scoring Categories, Weights, and Direction

There are two groups now. Five categories build the **Readiness Score**. Implementation Complexity is a **separate risk signal** and is not added into readiness (see Section 6 and the Week 3 decision in Section 11).

### Readiness categories (these produce the 0–100 score)

| Category | Weight | Direction | Main Idea |
|---|---:|---|---|
| AI Readiness | 22.5% | Higher = better | How clearly the company shows AI adoption, strategy, or investment |
| Data Privacy Maturity | 22.5% | Higher = better | How clearly the company explains data privacy practices and data handling |
| Cybersecurity Maturity | 22.5% | Higher = better | How visible and mature the public security posture appears |
| AI Governance & Accountability | 22.5% | Higher = better | How clearly the company shows responsible AI oversight and accountability |
| Automation Opportunity | 10% | Higher = more opportunity | How much room the company has to improve operations through automation |

The four core categories keep equal weight to each other, and Automation stays at half-weight because it is an opportunity signal rather than a maturity signal. Removing Implementation Complexity from the readiness formula freed up 10 percentage points; those were distributed evenly across the four core categories (20% → 22.5% each) so the four maturity dimensions still dominate readiness and Automation keeps its intended lighter influence. See Section 11, Q1 for why this was chosen over inverting.

### Separate risk signal (reported alongside, not inside, readiness)

| Signal | Scale | Direction | Main Idea |
|---|---:|---|---|
| Implementation Complexity | 1–5 | Higher = harder / riskier | How difficult AI or technology implementation may be due to regulation, size, legacy systems, or data sensitivity |

---

## 5. Category Rubrics

The rubrics for the five readiness categories are unchanged in substance from v0.1. They are summarized below; the "what to look for" lists and score-by-score examples from v0.1 still apply. Implementation Complexity keeps its rubric but is now used only as a standalone signal.

### 5.1 AI Readiness (22.5%, higher = better)

Measures how clearly the company demonstrates AI adoption, investment, products, strategy, or transformation.

| Score | Guidance |
|---:|---|
| 1 | No clear public AI mention, no AI roles, no visible strategy |
| 2 | Minimal, vague references to innovation or technology |
| 3 | Some AI activity visible, but limited, early-stage, or not tied to strategy |
| 4 | Clear AI initiatives, products, partnerships, or strategy publicly documented |
| 5 | Strong strategy with named initiatives, active deployments, major partnerships, measurable outcomes, or repeated investment signals |

### 5.2 Data Privacy Maturity (22.5%, higher = better)

Measures how clearly and transparently the company explains data privacy and data handling.

| Score | Guidance |
|---:|---|
| 1 | Privacy policy missing, extremely vague, or hard to find |
| 2 | Policy exists, but user controls or usage details are limited |
| 3 | Standard policy with basic transparency and some user controls |
| 4 | Detailed policy, clear user rights, strong compliance language |
| 5 | Comprehensive practices: clear controls, compliance commitments, privacy governance, high transparency |

### 5.3 Cybersecurity Maturity (22.5%, higher = better)

Measures visible evidence of security controls, risk management, certifications, and public posture.

| Score | Guidance |
|---:|---|
| 1 | No visible security page, trust center, certifications, or stance |
| 2 | Basic security claims, limited or vague detail |
| 3 | Some practices or certifications visible, but incomplete |
| 4 | Dedicated security/trust content, named controls, certifications, or clear risk management |
| 5 | Strong trust center, named frameworks/certifications, vulnerability disclosure, security transparency |

See Section 12, R4 for how confirmed breaches interact with this category (new in v0.2).

### 5.4 AI Governance & Accountability (22.5%, higher = better)

Measures evidence of responsible AI use, oversight, human accountability, transparency, or ethics processes.

| Score | Guidance |
|---:|---|
| 1 | No public mention of responsible AI, ethics, governance, or accountability |
| 2 | General responsible-technology language, no AI-specific process |
| 3 | Some responsible AI language, but oversight structure unclear |
| 4 | Published principles, governance process, human oversight, or accountability language |
| 5 | Strong framework: published principles, review processes, accountability structures, transparency, human oversight |

### 5.5 Automation Opportunity (10%, higher = more opportunity)

A consulting **opportunity** signal, not a maturity score. Estimates where the company may have meaningful room to improve efficiency through automation.

| Score | Guidance |
|---:|---|
| 1 | Little visible opportunity; operations simple or already highly automated |
| 2 | Some possible areas, limited scale or unclear value |
| 3 | Moderate opportunity in support, reporting, or internal workflows |
| 4 | Strong opportunity across multiple workflows or large operational areas |
| 5 | Very high opportunity due to large-scale, repetitive, manual, or document-heavy operations |

### 5.6 Implementation Complexity (separate signal, higher = harder)

Estimates how difficult AI adoption may be based on regulation, size, business units, global scale, legacy systems, and data sensitivity. **In v0.2 this is reported next to readiness, not inside it.**

| Score | Guidance |
|---:|---|
| 1 | Small org, low regulation, simpler operations |
| 2 | Some complexity, limited regulation or scale |
| 3 | Moderate complexity from size, data needs, or regulatory exposure |
| 4 | High complexity: regulation, data sensitivity, multiple systems, large operations |
| 5 | Very high complexity: heavy regulation, legacy systems, sensitive data, global scale, multiple business units |

---

## 6. Overall Readiness Score

### 6.1 Weighted Average (five readiness categories only)

```text
Weighted Average Score =
(AI Readiness            × 0.225) +
(Data Privacy Maturity   × 0.225) +
(Cybersecurity Maturity  × 0.225) +
(AI Governance           × 0.225) +
(Automation Opportunity  × 0.100)
```

The weighted average falls between **1 and 5**. Implementation Complexity is **not** in this formula.

### 6.2 Convert to a True 0–100 Scale

```text
Overall Readiness Score = ((Weighted Average Score - 1) / 4) × 100
```

| Weighted Average | 0–100 Score |
|---:|---:|
| 1.0 | 0 |
| 2.0 | 25 |
| 3.0 | 50 |
| 4.0 | 75 |
| 5.0 | 100 |

### 6.3 Reporting Implementation Complexity

Complexity is reported as its own field on every scorecard and as its own axis on the dashboard. Recommended presentation:

- **Dashboard:** plot Readiness (0–100) on one axis and Complexity (1–5) on the other. High-readiness / high-complexity companies (e.g., Visa, Mastercard, European Commission, VA) are the "high-value but hard" quadrant; high-readiness / low-complexity companies are the "quick win" quadrant.
- **Scorecard:** show `overall_readiness_score` and `implementation_complexity_score` side by side, never summed.

### 6.4 Worked Example

```text
AI Readiness = 4
Data Privacy = 3
Cybersecurity = 3
AI Governance = 2
Automation Opportunity = 4
Implementation Complexity = 3   (reported separately, NOT in the formula)

Weighted Average =
(4 × 0.225) + (3 × 0.225) + (3 × 0.225) + (2 × 0.225) + (4 × 0.10)
= 0.90 + 0.675 + 0.675 + 0.45 + 0.40
= 3.10

Overall Readiness Score = ((3.10 - 1) / 4) × 100 = 52.5 / 100
Implementation Complexity = 3  (shown alongside as risk signal)
```

> Note: this example lands at the same 52.5 as the v0.1 worked example by coincidence — in v0.1 the complexity term (3 × 0.10 = 0.30) happened to equal what the four core categories gained when reweighted. For most companies the two versions produce different scores, especially where complexity is 5.

---

## 7. Risk Level Classification

Thresholds remain **placeholders** in v0.2. The Week 3 review confirmed they should stay placeholders for now, because the current data does not spread across them (see Section 11, Q3).

| Overall Readiness Score | Readiness / Risk Interpretation |
|---:|---|
| 80–100 | High readiness / Lower visible risk |
| 60–79 | Moderate-high readiness / Manageable visible risk |
| 40–59 | Moderate-low readiness / Elevated visible risk |
| 20–39 | Low readiness / High visible risk |
| 0–19 | Very low readiness / Very high visible risk |

This label reflects only the project's scoring model and public evidence. It is not a complete enterprise risk assessment.

---

## 8. Required Dataset Fields for Scoring

Same as v0.1, with one clarification: `overall_readiness_score` now excludes complexity, and `implementation_complexity_score` is reported as a standalone field.

| Field | Purpose |
|---|---|
| `company_name` | Company being evaluated |
| `industry` | Sector |
| `source_urls` | Public sources used |
| `ai_readiness_notes` … `complexity_notes` | Evidence per category |
| `ai_readiness_score` … `automation_score` | 1–5, feed the readiness formula |
| `implementation_complexity_score` | 1–5, **separate risk signal** |
| `weighted_average_score` | 1–5, five readiness categories |
| `overall_readiness_score` | Converted 0–100 (readiness only) |
| `risk_level` | Placeholder classification |
| `scoring_version` | e.g., `v0.2` |
| `verification_status` | `Verified`, `Needs Review`, `Incomplete` |
| `last_checked_date` | Date last reviewed |
| `score_notes` | Short explanation for score decisions |

---

## 9. Scoring Workflow

1. Collect public sources (official first).
2. Write evidence notes before scores.
3. Assign 1–5 category scores; no high scores without clear evidence.
4. Write a one-sentence explanation per score.
5. Calculate the weighted average from the **five** readiness categories.
6. Convert to 0–100.
7. Record Implementation Complexity separately.
8. Assign a placeholder risk/readiness level.
9. Set verification status.
10. Record scoring version (`v0.2`).
11. Flag unclear cases for review; do not hide uncertainty.

---

## 10. Scoring Rules and Quality Standards

Carried forward from v0.1, plus the new rules in Section 12:

- Public sources only; every score ties to a source URL or note.
- No private, paid, restricted, or confidential information.
- Do not invent scores, evidence, companies, sources, or findings.
- Do not assume maturity from size or fame.
- Score lower when evidence is missing; mark `Needs Review`.
- One short explanation per category score minimum.
- Keep the evidence standard identical across companies.
- Track scoring version; re-score when the framework changes.
- v0.2 scores replace v0.1 scores; the whole dataset should be recomputed on the new formula before the dashboard is considered final (see Section 13).

---

## 11. Week 3 Review — Decisions Made

These were the open questions in v0.1. Each now has a decision and a reason grounded in the 50-company scoring pass.

### Q1 — Implementation Complexity direction → **DECISION: Separate it from readiness.**

In v0.1 complexity was added with "higher = better," so a company that is *harder* to implement scored *more ready*. That is indefensible in review. Three options were on the table: keep as-is, invert (`6 − score`), or separate.

- **Keep as-is:** rejected. It rewards difficulty as if it were readiness.
- **Invert inside the formula:** workable, but it blends a *risk* concept into a *readiness* concept and hides it. Under inversion, Visa, Mastercard, and the European Commission each dropped about 10 points purely because they are hard to implement — which distorts the readiness message.
- **Separate (chosen):** readiness is built only from categories that mean "more is better," and complexity rides alongside as an honest risk axis. This is the cleanest to explain and the most useful for the dashboard, because it lets us show the "high readiness but high complexity" quadrant instead of averaging that tension away.

### Q2 — Category weights → **DECISION: Keep the four core categories equal; redistribute the freed 10% evenly; keep Automation at half weight.**

Removing complexity freed 10 percentage points. Rather than invent an industry-specific weighting scheme (which would make cross-sector comparison harder and is tough to defend from public evidence alone), the four maturity categories move from 20% to 22.5% each and Automation stays at 10%. Industry-specific weighting was discussed and deferred — see Q5. This keeps the model simple and comparable across all 50 companies.

### Q3 — Risk thresholds → **DECISION: Keep as placeholders; do not finalize yet.**

The scoring pass showed the thresholds do not discriminate: about two-thirds of companies land in a single band (60–79), and the bottom two bands are empty. Tightening the bands now would be curve-fitting to a dataset that is skewed high because it is dominated by large, well-resourced organizations. The recommendation is to keep the placeholders, note the concentration openly, and revisit once the dataset includes smaller or less-resourced organizations that would actually populate the lower bands.

### Q4 — Cybersecurity incidents → **DECISION: Reflect confirmed, recent, material breaches in the cybersecurity score, and always explain in notes.** See Section 12, R4.

### Q5 — Industry baseline differences → **DECISION: Report with industry context, do not adjust scores by industry.** Same evidence standard for everyone; the dashboard already groups by sector, so context is visible without distorting the numbers.

### Q6 — Incomplete data → **DECISION: Allow partial scoring but mark `Incomplete` or `Needs Review`, and score thin evidence lower.** See Section 12, R1.

### Q7 — Source reliability → **DECISION: Adopt the v0.1 source hierarchy as a formal rule.** See Section 12, R3.

---

## 12. New and Revised Scoring Rules (v0.2)

### R1 — Thin evidence

If a category has little or no public evidence, score it 1 or 2, mark the category `Needs Review`, and state what was missing. Never fill a gap with an assumption or with reputation. "Large company, so probably mature" is not evidence.

### R2 — Conflicting sources

When sources disagree, prefer the more authoritative and more recent source (see R3), score toward the more conservative reading, and note the conflict in `score_notes`. If a company's own page claims strong security but a credible recent report documents a major breach, the breach is the stronger evidence for the security score.

### R3 — Source reliability hierarchy

1. Official company reports, policies, trust centers, and regulatory filings.
2. Public job postings and official press releases.
3. Reputable news or analyst coverage.
4. General blogs or third-party summaries.

Higher-tier sources win when sources conflict. A score resting only on tier 4 should be marked `Needs Review`.

### R4 — Confirmed cybersecurity incidents

A confirmed, recent, material breach should be reflected in the Cybersecurity Maturity score, not ignored. Guidance:

- Recent (roughly within ~24 months) and material (large record counts, regulatory action, or operational disruption) → cap the cybersecurity score at 2–3 depending on the response quality, and explain in notes.
- Older or well-remediated incidents with strong disclosure → may stay at 3 with a note.
- Always describe the incident, its recency, and the remediation in `cybersecurity_notes`. The number without the note is not defensible.

This makes the score reflect demonstrated posture, not just published intentions — the same logic already applied to the lowest cybersecurity scores in the dataset.

### R5 — Regulated industries

Regulation raises Implementation Complexity (the separate signal), and it may support Privacy or Governance scores **only where there is public evidence the company actually meets the requirement** — not merely that the requirement exists. Operating in a regulated sector is not itself proof of maturity.

---

## 13. Re-scoring Requirement After v0.2

Because the formula changed (complexity removed, four core weights raised to 22.5%), **every company must be recomputed on the v0.2 formula before the dashboard is treated as final.** The v0.1 `overall_readiness_score` values in the current dataset were produced with complexity added and should not be mixed with v0.2 values. During the scoring pass, at least one row (Molina Healthcare) already showed a stored score that did not match its own v0.1 formula output, which is a second reason to recompute the whole set cleanly under v0.2.

---

## 14. Definition of Done for v0.2

- [x] The team reviewed the v0.1 framework.
- [x] The six categories were confirmed as still the right categories.
- [x] The weight decision is documented (four core → 22.5%, Automation 10%, complexity removed from formula).
- [x] The 0–100 conversion method is confirmed to work for the dashboard.
- [x] Implementation Complexity is clearly handled as a **separate risk signal**.
- [x] Risk thresholds are kept as placeholders with a documented reason.
- [x] Rubric examples reviewed; unclear items clarified.
- [x] Rules added for thin evidence, conflicting sources, and regulated industries.
- [x] File updated and labeled v0.2.
- [x] Changelog explains what changed from v0.1 to v0.2.
- [ ] v0.2 committed to GitHub. *(Do this step yourself — see Section 16.)*

---

## 15. Changelog — v0.1 → v0.2

| # | Change | Why |
|---|---|---|
| 1 | **Implementation Complexity removed from the readiness formula and reported as a separate 1–5 risk signal.** | In v0.1 it was added as "higher = better," so harder-to-implement companies scored more ready. Separating it fixes the direction problem without hiding a risk concept inside a readiness score. |
| 2 | **Four core category weights raised from 20% to 22.5% each; Automation stays at 10%.** | Redistributes the 10% freed by removing complexity, evenly, keeping the four maturity dimensions dominant and comparable across sectors. |
| 3 | **Readiness formula and 0–100 conversion updated** to use five categories. | Follows directly from change 1. |
| 4 | **Complexity added to the dashboard as its own axis** (readiness vs. complexity quadrants). | Preserves the "high value but hard" insight that averaging destroyed in v0.1. |
| 5 | **Risk thresholds kept as placeholders, with a documented reason.** | ~66% of the 50 companies land in the 60–79 band and the bottom bands are empty; tightening now would curve-fit a high-skewed dataset. |
| 6 | **New rule R4: confirmed recent material breaches reflected in the cybersecurity score.** | Resolves Q4; makes the score reflect demonstrated posture, not just stated intent. |
| 7 | **New rules R1–R3, R5: thin evidence, conflicting sources, source hierarchy, regulated industries.** | Resolves Q6, Q7, Q5; makes scoring more consistent and defensible. |
| 8 | **Q5 resolved as "report industry context, don't adjust scores by industry."** | Keeps one evidence standard; the dashboard already groups by sector. |
| 9 | **Section 13 added: full dataset must be recomputed on v0.2 formula.** | Formula changed; v0.1 and v0.2 scores are not comparable, and at least one v0.1 row was already internally inconsistent. |
| 10 | **Scope note updated:** Government confirmed (was "on probation"). | Public evidence for Government proved strong enough to score all 10. |

---

## 16. How to Commit This File (final step)

From your local clone (`~/Documents/info340-code/` pattern — adjust to the repo that holds `docs/`):

```bash
# place this file at docs/scoring_framework.md in the repo, then:
git checkout -b week3-scoring-framework-v0.2
git add docs/scoring_framework.md
git commit -m "Update scoring framework to v0.2 after Week 3 review

- Separate Implementation Complexity from readiness (risk signal only)
- Reweight four core categories to 22.5%, Automation stays 10%
- Update formula and 0-100 conversion to five readiness categories
- Keep risk thresholds as placeholders (66% land in one band)
- Add rules R1-R5: thin evidence, conflicting sources, source hierarchy,
  breach handling, regulated industries
- Add changelog and dataset re-scoring requirement"
git push -u origin week3-scoring-framework-v0.2
```

Then open a pull request that closes the Week 3 issue. If you push straight to the working branch instead of a PR, replace the branch step with a commit on that branch.

---

## Project Note

AI Technology Consulting Readiness Dashboard · Scoring Framework v0.2 · Internal project use only · All scores based on publicly available information.
