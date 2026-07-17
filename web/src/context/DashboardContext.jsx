import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadCompanies } from "../data/loadCompanies.js";
import { riskTier } from "../data/metrics.js";

const EMPTY_FILTERS = {
  industry: "",
  company: "",
  minReadiness: 0,
  riskTier: "",
};

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [companies, setCompanies] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  useEffect(() => {
    let cancelled = false;
    loadCompanies()
      .then((data) => {
        if (!cancelled) setCompanies(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];
    return companies.filter(
      (c) =>
        (!filters.industry || c.industry === filters.industry) &&
        (!filters.company || c.companyName === filters.company) &&
        (c.aiReadinessScore ?? 0) >= filters.minReadiness &&
        (!filters.riskTier || riskTier(c) === filters.riskTier),
    );
  }, [companies, filters]);

  const hasActiveFilters =
    filters.industry !== "" ||
    filters.company !== "" ||
    filters.minReadiness !== 0 ||
    filters.riskTier !== "";

  const value = {
    companies: companies ?? [],
    loading: companies === null && error === null,
    error,
    filters,
    filteredCompanies,
    hasActiveFilters,
    setFilter: (key, val) => setFilters((f) => ({ ...f, [key]: val })),
    clearFilters: () => setFilters(EMPTY_FILTERS),
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }
  return ctx;
}
