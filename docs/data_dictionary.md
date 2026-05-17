# Data Dictionary

> **Version:** Draft  
> **Status:** In Progress – to be finalized in Week 1

This file defines every column in the company dataset. Use it as the reference for data entry, scoring, and dashboard connections.

---

## Dataset Columns

| Column Name | Data Type | Allowed Values | Description |
|---|---|---|---|
| company_name | Text | Any | Full legal or commonly used company name. Keep consistent — do not abbreviate. |
| industry | Text | Technology, Consulting, Finance, Healthcare/Biotech, Retail/E-Commerce, Transportation/Logistics | Industry category. Use the agreed list only. |
| company_size_type | Text | Large Enterprise, Mid-Size, Small Business, Unknown | Size or type of company based on public information. |
| source_url_1 | URL | Any valid URL | Primary public source link for this company. |
| source_url_2 | URL | Any valid URL or blank | Secondary source link. Leave blank if not applicable. |
| source_url_3 | URL | Any valid URL or blank | Tertiary source link. Leave blank if not applicable. |
| ai_readiness_notes | Text | Any | Brief notes on AI initiatives, products, job postings, strategy visible publicly. 1–3 sentences. |
| data_privacy_notes | Text | Any | Notes on privacy policy quality, user controls, compliance language. 1–3 sentences. |
| cybersecurity_notes | Text | Any | Notes on security pages, certifications, security roles, incident transparency. 1–3 sentences. |
| governance_notes | Text | Any | Notes on responsible AI principles, ethics policies, oversight mechanisms. 1–3 sentences. |
| automation_opportunity_notes | Text | Any | Notes on manual/process-heavy operations, automation potential. 1–3 sentences. |
| implementation_complexity_notes | Text | Any | Notes on regulation, company size, legacy systems, data sensitivity. 1–3 sentences. |
| ai_readiness_score | Integer | 1, 2, 3, 4, 5, or blank | Score for AI readiness category. Leave blank if not yet scored. |
| privacy_score | Integer | 1, 2, 3, 4, 5, or blank | Score for data privacy maturity. |
| cybersecurity_score | Integer | 1, 2, 3, 4, 5, or blank | Score for cybersecurity maturity. |
| governance_score | Integer | 1, 2, 3, 4, 5, or blank | Score for AI governance and accountability. |
| automation_opportunity_score | Integer | 1, 2, 3, 4, 5, or blank | Score for automation opportunity. |
| implementation_complexity_score | Integer | 1, 2, 3, 4, 5, or blank | Score for implementation complexity. |
| overall_readiness_score | Decimal | 1.0–5.0 or blank | Weighted average score using the formula in scoring_framework.md. Calculated automatically. |
| score_0_to_100 | Integer | 0–100 or blank | Overall readiness score converted to 0–100 scale for Power BI visuals. |
| risk_level | Text | High, Medium, Low, Unscored | Derived from overall_readiness_score: Low < 2.5, Medium 2.5–3.5, High > 3.5. |
| ai_summary | Text | Any or blank | AI-generated consulting-style summary of this company's AI readiness and tech risk profile. |
| ai_recommendation | Text | Any or blank | AI-generated specific, actionable consulting recommendations based on scores and notes. |
| ai_output_review_status | Text | Reviewed, Needs Revision, Rejected, Not Generated | Review status for AI-generated content. Only `Reviewed` outputs are used in the dashboard. |
| scoring_version | Text | Draft – v0.1, Scored – v0.2 | Version of the scoring model used. |
| verification_status | Text | Verified, Needs Review, Incomplete | Overall data quality status for this company entry. |
| last_checked_date | Date | YYYY-MM-DD | Date the company's public information was last reviewed. |

---

## Notes on Allowed Values

- **industry:** Use only the exact values listed above. Do not create new industry names without team approval.
- **scores:** Only integers 1–5. Do not use 0, decimals, or text like "N/A" in score columns — use blank if not yet scored.
- **verification_status:** Default to `Needs Review` when first added. Change to `Verified` only after source links are confirmed working and notes are complete.
- **risk_level:** This column is derived — do not fill it manually unless the formula is not available.

---

*Update this file whenever dataset columns are added, renamed, or removed. Column changes require team approval.*
