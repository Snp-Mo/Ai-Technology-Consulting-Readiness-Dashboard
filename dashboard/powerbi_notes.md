# Power BI Dashboard Notes

> **Status:** In Progress

## Setup Notes

- Data source: `data/processed/companies_dataset_v1.csv`
- Refresh method: Manual import (CSV reload when dataset is updated)
- Power BI file: saved locally — screenshots committed to `dashboard/screenshots/`

## Design Standard

- **Color palette:** Blue, grey, and white. Accent color: teal or orange for highlights.
- **Fonts:** Consistent across all pages. Titles larger than body text.
- **Every visual must have a title.**
- **Filters/slicers:** Placed at the top or right side of each page.
- **Avoid:** 3D effects, excessive decoration, small unreadable text.

## Dashboard Pages

| Page | Status | Notes |
|---|---|---|
| 1. Executive Overview | Not Started | Build first — most important for demo |
| 2. Industry Comparison | Not Started | |
| 3. Company Deep Dive | Not Started | Includes AI summary and recommendation cards |
| 4. GRC / Risk View | Not Started | Focus on privacy, cybersecurity, governance scores |
| 5. Recommendations / Action Plan | Not Started | Consulting-style next steps |

## Known Issues

*(Log any data connection issues, broken visuals, or column name mismatches here.)*

## Column Name Rules for CSV Import

- No spaces in column headers (use underscores: `ai_readiness_score`)
- All score columns must be numeric type, not text
- Risk Level must have consistent values: `High`, `Medium`, `Low`, `Unscored`
