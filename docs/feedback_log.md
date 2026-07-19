# External Feedback Log

This file logs feedback and context from conversations with people outside the core team (industry contacts, informal reviewers) that shaped project direction. It sits alongside `web_dashboard_chat_log.md` (which logs Claude Code build/technical decisions) — this file is for external stakeholder input and the reasoning behind how the team responded to it.

## Entry: Jul 2026 — Feedback from Fahima's brother (industry/GRC background)

**Context:** Feedback was given live over a team Zoom call, with Fahima, Ahmed, and Mohamed present. The speaker is Fahima's brother, not Fahima herself — he was on her Zoom account, which is why the raw transcript attributes his lines to her name. Not a professor or formal client review; an informal but sharp industry gut-check.

**Core critique, paraphrased:**

The dashboard looks polished, but polish isn't proof. Before a real buyer would trust or pay for this, it needs to visibly answer the questions they'd actually ask:

- How do you know your scores are trustworthy, and not just "everything looks like a 3 because evidence is moderate everywhere"?
- What's the *root cause* of risk in a given category — is a low cybersecurity score about technical breach exposure, human error/phishing, or third-party vendor risk? What regulations would apply, and what would enforcement look like?
- What does inaction cost a company, in real terms (e.g. paying $150K/month to third-party security monitoring vendors)? Recommendations without a cost/impact anchor don't land with a business audience.
- Is your sourcing visibly defensible, or does it read as "trust me"? The reflexive assumption now is "did you just paste this from ChatGPT" — sourcing has to be front and center, not buried in the dataset.
- Get pressure-tested early and often (TA/peer feedback before a professor, professor before an external panel) rather than revealing something polished for the first time under real scrutiny.

Ahmed raised the FAIR model (quantified risk estimation — primary loss like stolen assets, secondary loss like remediation/legal cost) as a possible direction; correctly identified as good instinct but out of scope for Version 1 per the blueprint's ban on complex modeling. Logged in `docs/future_improvements.md` as a Version 2 idea, not built now.

**Decisions made as a result:**

1. **Power BI dropped entirely**, website (`web/`) is now the sole dashboard deliverable. (Note: `web_dashboard_chat_log.md` currently frames the website as parallel to, not a replacement for, Power BI — that framing is now out of date and should be corrected there and in the root README.)
2. A **Business Question Bank** (below) was created to pressure-test the site against realistic buyer questions before any external presentation.
3. Refinements were scoped as additions to the *already-built* 5 pages, not new pages:
   - Executive Overview: add explicit buyer-facing framing at the top (why this exists, what it answers).
   - Company Deep Dive: surface source links directly on the page, not just in the underlying dataset.
   - GRC & Risk View: add root-cause and applicable-regulation language to the rubric/notes, not a new scoring category.
   - Recommendations: add a sourced cost/impact line per recommendation (real benchmark figures, not fabricated per-company numbers).
4. A team mock Q&A against the question bank is planned before any demo or external share.

## Business Question Bank

Used as the team's internal pressure-test. Each question maps to a dashboard page; the goal is that the team can answer all of these out loud, unaided, before presenting externally.

**Executive Overview**
1. How many companies were assessed, and how do you know your evidence is solid enough to trust?
2. Which industries are furthest behind on AI readiness, and why?
3. What's the single biggest risk theme across the dataset?

**Industry Comparison**
4. Which industry has the most automation opportunity but the most implementation risk?
5. Why does one industry score higher on governance than another — regulation, size, or actual practice?

**Company Deep Dive**
6. What specific evidence backs this company's score — not just the number, the source?
7. What would it cost this company, roughly, to not close its biggest gap?
8. What's driving a low privacy/cybersecurity score — disclosed poor practice, or just absence of public disclosure (not the same thing)?

**GRC & Risk View**
9. What's the likely root-cause category for risk in this sector — technical breach, human error/phishing, or third-party/vendor exposure?
10. What regulations would apply if this company mishandled data, and is there public evidence they account for that?
11. Are there known public incidents or enforcement actions tied to this company or its peers?

**Recommendations**
12. If a company adopted the top recommendation, what's the realistic payoff?
13. What's the cheapest/fastest fix vs. the highest-impact fix, and how do you tell them apart?
14. Why trust an AI-generated recommendation over a human consultant's?

**Methodology / credibility**
15. How do you know scores aren't defaulting to "everything's a 3" when evidence is moderate?
16. What's the evidence bar — what does it take to earn a 5 vs. a 1?
17. What happens when sources conflict or are silent on something?

## Status

Logged for reference. Not yet actioned in the live site as of this entry — see `web_dashboard_chat_log.md` for build status and GitHub issues for tracked work.
