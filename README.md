# AI Technology Consulting Readiness Dashboard

> **Status:** In Progress – Version 1

A consulting-style dashboard that evaluates how prepared companies are for AI adoption, digital transformation, automation, and technology change — using public company information, a structured scoring framework, AI-assisted insights, and Power BI visuals.

---

## Project Goal

Turn public company data into structured, measurable, consulting-style insights. The final product helps explain which companies appear more ready for AI and digital transformation, where visible technology risks exist, and what practical recommendations can be made based on public evidence.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Python | Data cleaning, scoring logic, AI workflow |
| SQLite | Structured database for project data |
| Power BI | Main dashboard and visual presentation |
| GitHub | Version control and project documentation |
| Google Sheets / Excel | Dataset collection and early scoring |
| ChatGPT / Claude / Gemini | AI-assisted summaries and recommendations |

---

## Repository Structure

```
ai-technology-consulting-readiness-dashboard/
│
├── data/
│   ├── raw/           # Original collected data (not committed if sensitive)
│   ├── processed/     # Cleaned, export-ready datasets
│   └── sample/        # Sample/template files
│
├── database/
│   ├── schema.sql     # SQLite database schema
│   └── README.md      # Schema documentation
│
├── scripts/
│   ├── clean_data.py
│   ├── score_companies.py
│   └── generate_recommendations.py
│
├── dashboard/
│   ├── screenshots/   # Power BI page screenshots
│   └── powerbi_notes.md
│
├── docs/
│   ├── project_plan.md
│   ├── scoring_framework.md   ← v0.1 draft
│   ├── data_dictionary.md
│   ├── ai_workflow.md
│   ├── limitations.md
│   ├── final_report.md
│   ├── future_improvements.md
│   └── demo_script.md
│
├── README.md
├── requirements.txt
└── .gitignore
```

---

## Scoring Framework (v0.1 Draft)

Each company is scored 1–5 in six categories:

| Category | Weight |
|---|---|
| AI Readiness | 20% |
| Data Privacy Maturity | 20% |
| Cybersecurity Maturity | 20% |
| AI Governance and Accountability | 20% |
| Automation Opportunity | 10% |
| Implementation Complexity | 10% |

> **Note:** The scoring model is currently v0.1 (working draft). It will be reviewed and revised in Week 3 before the dashboard is built.

---

## Dashboard Pages

1. Executive Overview
2. Industry Comparison
3. Company Deep Dive
4. GRC / Risk View
5. Recommendations and Action Plan

---

## Team Roles

| Role | Responsibility |
|---|---|
| Project Manager | Timeline, coordination, final review |
| Data Collection Lead | Research, source links, dataset expansion |
| Scoring Lead | Scoring framework, rubric, GRC/risk scoring |
| AI Summaries Lead | Prompt design, AI output generation and review |
| Dashboard Lead | Power BI build, wireframes, screenshots |
| QA / Report Lead | Quality review, consulting report, documentation |

---

## Limitations

- Uses publicly available information only.
- Scores reflect visible public signals, not internal company data.
- AI-generated summaries are reviewed but may not capture the full picture.
- Version 1 is not a deployed web app or real client engagement.

See [`docs/limitations.md`](docs/limitations.md) for full details.

---

## How to Navigate This Repo

- Start with this README.
- Review [`docs/scoring_framework.md`](docs/scoring_framework.md) to understand how companies are scored.
- Review [`docs/data_dictionary.md`](docs/data_dictionary.md) for column definitions.
- See [`dashboard/screenshots/`](dashboard/screenshots/) for Power BI page previews.
- See [`docs/final_report.md`](docs/final_report.md) for the consulting-style summary.
