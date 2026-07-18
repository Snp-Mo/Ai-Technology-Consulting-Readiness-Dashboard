import { useDashboard } from "../context/DashboardContext.jsx";
import { GrcSkeleton } from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Card from "../components/ui/Card.jsx";
import GrcKpiRow from "../components/grc/GrcKpiRow.jsx";
import RiskTierBreakdown from "../components/grc/RiskTierBreakdown.jsx";
import GrcCategoryBars from "../components/grc/GrcCategoryBars.jsx";
import RiskTable from "../components/grc/RiskTable.jsx";
import RiskSignals from "../components/grc/RiskSignals.jsx";
import IndustryLegend from "../components/charts/IndustryLegend.jsx";
import { grcWatchSignals } from "../data/metrics.js";
import { COLORS, INDUSTRY_ORDER } from "../theme/colors.js";

export default function GrcRiskView() {
  const { loading, error, filteredCompanies } = useDashboard();

  if (loading) return <GrcSkeleton />;

  if (error) {
    return (
      <Card accent={COLORS.bad} className="p-6">
        <p className="text-sm font-semibold">Could not load company data</p>
        <p className="mt-1 text-xs text-muted">{String(error.message ?? error)}</p>
      </Card>
    );
  }

  const signals = grcWatchSignals(filteredCompanies);
  const industries = INDUSTRY_ORDER.filter((ind) =>
    filteredCompanies.some((c) => c.industry === ind),
  );

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-semibold">GRC &amp; Risk View</h1>
        <p className="mt-0.5 text-xs text-muted">
          Governance, risk, and compliance posture across{" "}
          {filteredCompanies.length} compan
          {filteredCompanies.length === 1 ? "y" : "ies"}
        </p>
      </header>

      {filteredCompanies.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <GrcKpiRow companies={filteredCompanies} signals={signals} />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card delay={0.15} className="p-5">
              <h2 className="text-sm font-semibold">Risk tier breakdown</h2>
              <div className="mt-4 h-60">
                <RiskTierBreakdown companies={filteredCompanies} />
              </div>
            </Card>
            <Card delay={0.2} className="p-5 xl:col-span-2">
              <h2 className="text-sm font-semibold">
                GRC score averages by industry
              </h2>
              <div className="mt-4 h-60">
                <GrcCategoryBars companies={filteredCompanies} />
              </div>
              {industries.length > 1 && (
                <IndustryLegend industries={industries} />
              )}
            </Card>
          </div>

          <RiskTable companies={filteredCompanies} delay={0.25} />

          <RiskSignals signals={signals} delay={0.3} />
        </>
      )}
    </div>
  );
}
