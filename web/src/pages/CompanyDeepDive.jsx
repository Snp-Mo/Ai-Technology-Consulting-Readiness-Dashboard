import { useMemo } from "react";
import { useDashboard } from "../context/DashboardContext.jsx";
import { riskTier } from "../data/metrics.js";
import { DeepDiveSkeleton } from "../components/ui/Skeleton.jsx";
import Card from "../components/ui/Card.jsx";
import CompanySelector from "../components/company/CompanySelector.jsx";
import CompanyHeader from "../components/company/CompanyHeader.jsx";
import Scorecard from "../components/company/Scorecard.jsx";
import StrengthsWatch from "../components/company/StrengthsWatch.jsx";
import AiNarrative from "../components/company/AiNarrative.jsx";
import SourceLinks from "../components/company/SourceLinks.jsx";
import { COLORS } from "../theme/colors.js";

export default function CompanyDeepDive() {
  const { loading, error, companies, filters, setFilter } = useDashboard();

  // Companies that satisfy every active filter except the company selection
  // itself — this is what the picker offers and what the header may pull from.
  const candidates = useMemo(() => {
    return companies
      .filter(
        (c) =>
          (!filters.industry || c.industry === filters.industry) &&
          (c.aiReadinessScore ?? 0) >= filters.minReadiness &&
          (!filters.riskTier || riskTier(c) === filters.riskTier),
      )
      .sort((a, b) => a.companyName.localeCompare(b.companyName));
  }, [companies, filters.industry, filters.minReadiness, filters.riskTier]);

  if (loading) return <DeepDiveSkeleton />;

  if (error) {
    return (
      <Card accent={COLORS.bad} className="p-6">
        <p className="text-sm font-semibold">Could not load company data</p>
        <p className="mt-1 text-xs text-muted">{String(error.message ?? error)}</p>
      </Card>
    );
  }

  const selected = filters.company
    ? candidates.find((c) => c.companyName === filters.company)
    : null;

  // A company is selected in the filter but excluded by the other filters.
  const excludedByFilters = filters.company && !selected;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-semibold">Company Deep Dive</h1>
        <p className="mt-0.5 text-xs text-muted">
          Full readiness profile for one company · {candidates.length} in view
        </p>
      </header>

      <CompanySelector
        candidates={candidates}
        value={filters.company}
        onSelect={(name) => setFilter("company", name)}
      />

      {selected ? (
        <>
          <CompanyHeader company={selected} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Scorecard company={selected} delay={0.1} />
            <div className="lg:col-span-2">
              <StrengthsWatch company={selected} delay={0.15} />
            </div>
          </div>
          <AiNarrative company={selected} delay={0.2} />
          <SourceLinks company={selected} delay={0.25} />
        </>
      ) : excludedByFilters ? (
        <Card className="flex flex-col items-center gap-3 px-8 py-14 text-center">
          <p className="text-sm font-semibold">
            {filters.company} is hidden by the current filters
          </p>
          <p className="max-w-sm text-xs text-muted">
            The sidebar filters exclude this company. Adjust the industry, risk,
            or readiness filter to bring it back into view.
          </p>
        </Card>
      ) : (
        <Card className="flex flex-col items-center gap-3 px-8 py-14 text-center">
          <p className="text-sm font-semibold">Select a company to begin</p>
          <p className="max-w-sm text-xs text-muted">
            Search above to open a company's full readiness profile — scorecard,
            strengths and watch areas, AI summary, and sources.
          </p>
        </Card>
      )}
    </div>
  );
}
