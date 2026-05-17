# Scoring Framework

> **Version:** v0.1 – Working Draft  
> **Status:** Draft – Do not treat as final until Week 3 review is complete.
> **Changelog:**
> - v0.1 (Week 0): Initial draft based on blueprint Section 10.

---

## Overview

Each company is scored 1–5 in six categories based on publicly observable signals only.

| Score | Meaning |
|---|---|
| 1 | Very weak / little public evidence |
| 2 | Limited evidence |
| 3 | Moderate evidence |
| 4 | Strong evidence |
| 5 | Very strong evidence |

---

## Categories and Weights

| Category | Weight | What to Look For |
|---|---|---|
| AI Readiness | 20% | AI initiatives, products, job postings, partnerships, strategy pages, annual report mentions |
| Data Privacy Maturity | 20% | Privacy policy clarity, data collection transparency, user controls, compliance language |
| Cybersecurity Maturity | 20% | Security/trust pages, cybersecurity roles, incident transparency, certifications |
| AI Governance & Accountability | 20% | Responsible AI principles, ethics policies, human oversight, AI transparency |
| Automation Opportunity | 10% | Manual/process-heavy operations, support needs, logistics/finance/HR workflows |
| Implementation Complexity | 10% | Regulation, company size, legacy systems, data sensitivity, multiple business units |

---

## Weighted Score Formula

```
Overall Readiness Score =
  (AI Readiness × 0.20) +
  (Data Privacy Maturity × 0.20) +
  (Cybersecurity Maturity × 0.20) +
  (AI Governance × 0.20) +
  (Automation Opportunity × 0.10) +
  (Implementation Complexity × 0.10)
```

### Convert to 0–100 Scale

```
Score_0_to_100 = ((Overall Readiness Score - 1) / 4) × 100
```

*Where 1 is the minimum possible score and 5 is the maximum.*

---

## Rubric Examples (v0.1 – To Be Revised in Week 3)

### AI Readiness
- **Score 1:** No public AI mention, no AI-related roles, no technology strategy page visible.
- **Score 3:** General mentions of "digital transformation" or "innovation" without specific AI initiatives.
- **Score 5:** Dedicated AI product page, named AI initiatives, AI partnerships with major vendors, recent AI-specific job postings, AI mentioned in annual report or investor presentation.

### Data Privacy Maturity
- **Score 1:** Privacy policy missing or very generic, no user controls mentioned, no compliance language.
- **Score 3:** Standard privacy policy exists, basic data collection noted, limited user control options.
- **Score 5:** Clear, detailed privacy policy, GDPR/CCPA compliance stated, named data officer, user opt-out controls, transparency report available.

### Cybersecurity Maturity
- **Score 1:** No security page, no security-related roles visible, no certifications mentioned.
- **Score 3:** Basic security mentions on website, some security roles in job postings, general compliance noted.
- **Score 5:** Dedicated trust/security page, named CISO or security leadership, certifications (SOC 2, ISO 27001), transparent incident response history.

### AI Governance & Accountability
- **Score 1:** No responsible AI content, no ethics policy, no oversight mentions.
- **Score 3:** Brief mention of ethical AI or responsible technology in general terms.
- **Score 5:** Published responsible AI principles, named AI ethics board or review process, AI transparency documentation, human oversight described.

### Automation Opportunity
- **Score 1:** Little evidence of manual or repetitive processes; highly automated industry already.
- **Score 3:** Standard industry operations with some visible manual process areas (customer support, reporting).
- **Score 5:** Heavily manual/process-intensive operations, large customer service workforce, logistics or document-heavy workflows, clear automation ROI opportunity.

### Implementation Complexity
- **Score 1:** Small company, single product line, low regulation, no obvious legacy system indicators.
- **Score 3:** Mid-size company, moderate regulation, some operational complexity.
- **Score 5:** Large enterprise, heavily regulated industry (healthcare, finance), known legacy systems, multiple business units, high data sensitivity requirements.

---

## Scoring Rules (v0.1 Draft)

- Use public sources only. Do not assume based on company size or reputation alone.
- Write one sentence explaining every score you assign.
- If you cannot explain a score in one sentence, the evidence may be too weak — score lower and mark `Needs Review`.
- Label all scores as `Draft – v0.1` until the Week 3 review is complete.
- When evidence is thin or conflicting, use the lower score and note the gap.
- For regulated industries (healthcare, finance), Implementation Complexity should default to at least 3 unless there is strong evidence otherwise.

---

*This framework will be reviewed and revised in Week 3. See the changelog at the top of this file for version history.*
