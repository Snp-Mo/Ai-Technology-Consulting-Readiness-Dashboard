-- =============================================================================
-- AI Technology Consulting Readiness Dashboard
-- SQLite Database Schema
-- Version: Draft (to be finalized in Weeks 7–8)
-- =============================================================================

-- Companies table: one row per company
CREATE TABLE IF NOT EXISTS companies (
    company_id          INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name        TEXT NOT NULL UNIQUE,
    industry            TEXT NOT NULL,
    size_type           TEXT,
    verification_status TEXT DEFAULT 'Needs Review',
    scoring_version     TEXT DEFAULT 'Draft - v0.1',
    last_checked_date   TEXT,
    created_at          TEXT DEFAULT (DATE('now'))
);

-- Sources table: one or more source links per company
CREATE TABLE IF NOT EXISTS sources (
    source_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id  INTEGER NOT NULL,
    source_url  TEXT NOT NULL,
    source_type TEXT,   -- e.g. 'Company Website', 'Annual Report', 'News Article'
    notes       TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- Scores table: one row per company per scoring category
CREATE TABLE IF NOT EXISTS scores (
    score_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id      INTEGER NOT NULL,
    category        TEXT NOT NULL,  -- e.g. 'AI Readiness', 'Data Privacy Maturity'
    score_value     INTEGER CHECK(score_value BETWEEN 1 AND 5),
    score_note      TEXT,
    scoring_version TEXT DEFAULT 'Draft - v0.1',
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- Recommendations table: one row per company for AI-generated outputs
CREATE TABLE IF NOT EXISTS recommendations (
    rec_id              INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id          INTEGER NOT NULL,
    summary_text        TEXT,
    recommendation_text TEXT,
    review_status       TEXT DEFAULT 'Not Generated',  -- 'Reviewed', 'Needs Revision', 'Rejected'
    generated_at        TEXT,
    reviewed_at         TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

-- Overall scores view (for convenience — not a table)
-- Run this to see the weighted scores for all companies:
--
-- SELECT
--     c.company_name,
--     c.industry,
--     ROUND(
--         (MAX(CASE WHEN s.category = 'AI Readiness'                THEN s.score_value END) * 0.20) +
--         (MAX(CASE WHEN s.category = 'Data Privacy Maturity'       THEN s.score_value END) * 0.20) +
--         (MAX(CASE WHEN s.category = 'Cybersecurity Maturity'      THEN s.score_value END) * 0.20) +
--         (MAX(CASE WHEN s.category = 'AI Governance'               THEN s.score_value END) * 0.20) +
--         (MAX(CASE WHEN s.category = 'Automation Opportunity'      THEN s.score_value END) * 0.10) +
--         (MAX(CASE WHEN s.category = 'Implementation Complexity'   THEN s.score_value END) * 0.10),
--     2) AS overall_score,
--     ROUND(
--         (
--             (MAX(CASE WHEN s.category = 'AI Readiness'                THEN s.score_value END) * 0.20) +
--             (MAX(CASE WHEN s.category = 'Data Privacy Maturity'       THEN s.score_value END) * 0.20) +
--             (MAX(CASE WHEN s.category = 'Cybersecurity Maturity'      THEN s.score_value END) * 0.20) +
--             (MAX(CASE WHEN s.category = 'AI Governance'               THEN s.score_value END) * 0.20) +
--             (MAX(CASE WHEN s.category = 'Automation Opportunity'      THEN s.score_value END) * 0.10) +
--             (MAX(CASE WHEN s.category = 'Implementation Complexity'   THEN s.score_value END) * 0.10)
--             - 1
--         ) / 4.0 * 100,
--     0) AS score_0_to_100
-- FROM companies c
-- LEFT JOIN scores s ON c.company_id = s.company_id
-- GROUP BY c.company_id, c.company_name, c.industry;
