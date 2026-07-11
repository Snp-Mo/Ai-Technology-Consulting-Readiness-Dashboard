# AI Technology Consulting Readiness Dashboard

**Status:** In Progress — Final Polish and Consulting Report Milestone

> **Goal:** Evaluate how prepared organizations are for AI adoption by combining public research, structured scoring, risk analysis, and consulting-style recommendations.

## Project Description

The AI Technology Consulting Readiness Dashboard evaluates companies across six areas: AI readiness, data privacy, cybersecurity, AI governance, automation opportunity, and implementation complexity. Publicly available evidence is collected, reviewed, and converted into standardized scores and recommendations. The cleaned dataset is visualized in Power BI so users can compare industries, identify risks, and explore individual company profiles. This student-built project demonstrates consulting research, data analysis, AI-assisted workflows, dashboard development, and project management.

## Tech Stack

| Tool | Purpose |
|---|---|
| Power BI | Dashboard development and data visualization |
| Excel / Google Sheets | Company research, scoring, and data review |
| Python | Data cleaning, validation, and scoring support |
| SQL / SQLite | Structured storage for companies, sources, scores, and recommendations |
| GitHub | Version control, documentation, and team collaboration |
| VS Code | Editing code, data files, and documentation |
| ChatGPT / Gemini | Drafting source-based summaries and recommendations with human review |

## Dashboard Screenshots

Dashboard screenshots will be added after the Power BI dashboard is completed.

## Folder Structure

```text
ai-consulting-readiness-dashboard/
├── README.md
├── data/
│   ├── raw/
│   ├── cleaned/
│   └── final/
├── dashboard/
│   └── ai_readiness_dashboard.pbix
├── docs/
│   ├── images/
│   │   ├── executive-overview.png
│   │   └── company-deep-dive.png
│   ├── scoring_framework.md
│   ├── data_dictionary.md
│   ├── ai_workflow.md
│   └── limitations.md
├── scripts/
│   ├── clean_data.py
│   └── calculate_scores.py
├── sql/
│   └── schema.sql
└── reports/
    └── final_consulting_report.pdf
```

## Team Roles

| Team Member | Role | Main Responsibilities |
|---|---|---|
| Abdulrahman | Project Manager and Quality Check Lead | Tracks milestones, reviews final work, checks source support, and coordinates the dashboard and demo |
| Fahima | Data Collection and Research Lead | Collects public company evidence, adds source links, and prepares research notes |
| Ahmed | Scoring Framework and GRC/Risk Lead | Applies and reviews privacy, cybersecurity, governance, and readiness scores |
| Mohamed | SQL, AI Workflow, and Dashboard Support | Supports database structure, prepares data for Power BI, and organizes AI outputs |
| Abdulrahman and Mohamed | Dashboard and Visualization | Build dashboard pages, filters, scorecards, comparisons, and exported screenshots |

## How to Navigate the Repository

Start with the files in `docs/` to understand how the project works:

- [Scoring Framework](docs/scoring_framework.md) explains the six scoring categories and the 1–5 scoring scale.
- [Data Dictionary](docs/data_dictionary.md) defines every field in the dataset.
- [AI Workflow](docs/ai_workflow.md) explains how summaries and recommendations are generated, reviewed, and approved.
- `data/` contains the raw, cleaned, and final datasets.
- `scripts/` contains the data-cleaning and score-calculation code.
- `sql/` contains the database schema.
- `dashboard/` contains the Power BI project file.
- `reports/` contains the final consulting-style report.

## Project Status

The project is currently in the **July final-polish milestone**. Company research, scoring, and AI-generated outputs have been developed and reviewed. Current work focuses on completing the Power BI dashboard, improving documentation, checking consistency across the dataset, and preparing the final consulting report and demo.

## Limitations

The analysis uses publicly available information, so missing or unclear evidence may affect company scores. The scores are educational estimates rather than official audits, and AI-generated text must be manually reviewed before use. Industry differences, changing company practices, and limited access to private internal controls also affect comparisons.

See the full [Limitations Document](docs/limitations.md) for more detail.

## Disclaimer

This project is for educational and portfolio purposes. It does not represent an official company audit, investment recommendation, legal opinion, or professional consulting engagement.
