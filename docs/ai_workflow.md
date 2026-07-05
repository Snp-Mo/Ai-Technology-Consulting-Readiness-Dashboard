# AI Workflow

> **Status:** Complete — Issue #25
> Prompt templates for AI-generated summaries and recommendations, tested across 5 sectors, reviewed for grounding.

## 1. Summary Prompt Template

Based only on the following research notes for [Company Name], write a 3–4 sentence consulting-style summary of this company's AI readiness and technology risk profile. Do not add any information not present in the notes below.

Notes:
[paste structured notes from dataset]

## 2. Recommendation Prompt Template

Based only on the following scores and research notes for [Company Name], write 2–3 specific, actionable consulting recommendations for improving this company's AI readiness and reducing its technology risk. Each recommendation must reference a specific score or evidence from the notes. Do not add claims not present in the notes.

Scores:
[paste scores]

Notes:
[paste notes]

## 3. Prompt Testing (5 Companies Across 5 Sectors)

All outputs below use only the structured notes and scores from the spreadsheet.

### Healthcare — Kaiser Permanente

**Summary:** Kaiser Permanente demonstrates high AI readiness due to decades of investment in integrated care, unified Epic adoption, and large-scale population health datasets. The organization uses AI in imaging, predictive analytics, and clinical decision support. Kaiser maintains strong privacy governance with HIPAA compliance and role-based access controls. Its large workforce and multi-region structure introduce moderate implementation complexity, but its digital maturity reduces overall technology risk.

**Recommendations:**
1. Expand automation in administrative workflows such as claims processing and scheduling, supported by the Automation Opportunity Score of 5.
2. Reduce implementation complexity (score 4) through targeted change management and clinician training.
3. Strengthen governance by evolving toward a hybrid model aligned with the Governance Score of 4.

**Grounding Check:** All statements trace to Kaiser's notes. Cybersecurity notes are missing from the dataset for Kaiser — no cybersecurity claim was made in the summary, so no correction was needed.

### Technology — Microsoft

**Summary:** Microsoft demonstrates very strong AI readiness, driven by its cloud-first strategy, Azure AI and Copilot investments, and the introduction of autonomous AI agents through Microsoft Scout. The company operates one of the largest cybersecurity ecosystems in the world, integrating threat detection, identity protection, and secure cloud infrastructure across Azure and Microsoft 365. Governance is mature, built around responsible AI principles, audit logs, and policy enforcement across its expanding AI portfolio. Automation opportunities are extensive across cloud services, productivity tools, and enterprise workflows, though implementation complexity varies with licensing, identity management, and endpoint readiness for autonomous agents.

*(Data privacy research notes are not yet documented for Microsoft in the dataset — labeled Needs Review. No privacy claim is included above.)*

**Recommendations:**
1. Expand automation in cloud operations and enterprise workflows, supported by the Automation Opportunity Score of 5.
2. Reduce implementation complexity by aligning AI deployment across product teams, consistent with the Implementation Complexity Score of 3.
3. Strengthen governance for responsible AI, aligned with the Governance Score of 5.

**Grounding Check:** AI readiness, cybersecurity, governance, automation, and implementation complexity statements are grounded in the dataset notes. Data privacy notes are missing for Microsoft — flagged Needs Review, not treated as grounded. (Note: Microsoft's Privacy Score in the sheet is currently 4 despite no supporting notes — flagged separately for the data/scoring team to review once notes are added.)

### Finance — JPMorgan Chase

**Summary:** JPMorgan Chase demonstrates strong AI readiness through enterprise-scale data systems and advanced analytics. The company maintains mature privacy and security practices and operates globally across regulated financial environments. JPMorgan has significant automation opportunities in risk analytics and operations. Implementation complexity is high due to legacy systems and global regulatory requirements.

**Recommendations:**
1. Expand automation in fraud detection and risk analytics, supported by the Automation Opportunity Score of 5.
2. Reduce implementation complexity (score 5) by modernizing legacy systems and harmonizing data flows.
3. Strengthen governance for model risk management, aligned with the Governance Score of 4.

**Grounding Check:** All statements trace to JPMorgan's notes.

### Consulting — Accenture

**Summary:** Accenture demonstrates strong AI readiness supported by global digital capabilities and enterprise-scale operations. The company maintains strong privacy and security practices and operates secure delivery environments. Accenture has significant automation opportunities across consulting workflows. Implementation complexity is moderate due to global operations and diverse service lines.

**Recommendations:**
1. Expand automation in delivery operations and knowledge workflows, supported by the Automation Opportunity Score of 5.
2. Reduce implementation complexity (score 4) by standardizing AI deployment across global teams.
3. Strengthen governance for responsible AI, aligned with the Governance Score of 4.

**Grounding Check:** All statements trace to Accenture's notes.

### Government — U.S. Department of Defense (DoD)

**Summary:** The U.S. Department of Defense demonstrates strong AI readiness supported by advanced digital infrastructure and mission-critical systems. The DoD maintains strict privacy and security practices and operates one of the most complex data environments in government. The department has significant automation opportunities across defense operations. Implementation complexity is high due to scale, mission diversity, and legacy systems.

**Recommendations:**
1. Expand automation in mission support and operational workflows, supported by the Automation Opportunity Score of 5.
2. Reduce implementation complexity (score 5) by modernizing legacy systems and improving interoperability.
3. Strengthen governance for AI safety and oversight, aligned with the Governance Score of 5.

**Grounding Check:** All statements trace to DoD's notes.

## 4. Revision Review

Two issues were found during grounding checks and corrected before finalizing this document:

1. **Microsoft's summary contained an unsupported privacy claim** ("maintains strong privacy and security practices") with no corresponding Data Privacy Notes in the dataset. The claim was removed and replaced with an explicit Needs Review flag rather than fabricated content.
2. **Score citations were inconsistent across companies.** Kaiser's recommendations cited actual score values; Microsoft, JPMorgan, Accenture, and DoD originally cited only the category name without the number. All four were updated to cite the real score values pulled directly from the dataset.

**Result:** One unsupported claim corrected, one consistency gap fixed across four companies. All other statements confirmed grounded in the dataset notes. Microsoft's privacy status remains an open dataset gap (tracked separately) rather than a prompt-output problem.

## 5. AI Tool Used

Testing conducted using Claude (Anthropic).

## 6. Review Criteria

An AI output is marked `Reviewed` only if:
1. Every factual claim traces to a source link or research note already in the dataset for that company.
2. Every recommendation references a specific, actual score value from the dataset (not just the category name).
3. No category is discussed in the summary if the corresponding research notes are missing — that category is flagged `Needs Review` instead.

Outputs that fail any of these are marked `Needs Revision` and corrected before being added to the dataset.
