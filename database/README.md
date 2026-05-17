# Database Schema Documentation

> **Status:** Draft – To be finalized in Weeks 7–8

## Overview

This folder contains the SQLite database schema for the AI Technology Consulting Readiness Dashboard. The schema organizes company research, source links, scores, and AI-generated recommendations into a structured, relational format.

## Tables

| Table | Description |
|---|---|
| `companies` | One row per company. Contains name, industry, size, verification status, and dates. |
| `sources` | One or more source links per company. Linked to companies via company_id. |
| `scores` | One row per company per scoring category (6 rows per company when fully scored). |
| `recommendations` | One row per company. Contains AI-generated summary and recommendation text with review status. |

## Relationships

- `sources.company_id` → `companies.company_id`
- `scores.company_id` → `companies.company_id`
- `recommendations.company_id` → `companies.company_id`

## How to Use

1. Install DB Browser for SQLite: https://sqlitebrowser.org/
2. Open `schema.sql` and run it to create the tables.
3. Import data from `data/processed/companies_final.csv` or populate manually.
4. Use the commented query in `schema.sql` to calculate weighted overall scores.

## Version History

- Draft (Weeks 7–8): Initial schema created.
