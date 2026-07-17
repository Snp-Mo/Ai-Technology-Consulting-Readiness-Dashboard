// Chart-side palette. Recharts/Nivo need literal color values, so this file
// mirrors the @theme tokens in index.css — keep the two in sync.
export const COLORS = {
  canvas: "#14161C",
  surface: "#1C1F27",
  ink: "#E7E6E2",
  muted: "#8B8D96",
  accent: "#6B84A3",
  good: "#4CAF7D",
  warn: "#E0A83E",
  bad: "#E0654F",
  grid: "#262A34",
};

export const INDUSTRY_ORDER = [
  "Technology",
  "Healthcare",
  "Finance",
  "Consulting",
  "Government",
];

export const INDUSTRY_COLORS = {
  Technology: "#5B8DEF",
  Healthcare: "#4FB88A",
  Finance: "#A78BFA",
  Consulting: "#E8965A",
  Government: "#95A5BC",
};

export const TIER_COLORS = {
  good: COLORS.good,
  warn: COLORS.warn,
  bad: COLORS.bad,
};
