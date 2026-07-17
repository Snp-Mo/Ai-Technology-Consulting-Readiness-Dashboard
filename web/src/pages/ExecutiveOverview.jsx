import { useDashboard } from "../context/DashboardContext.jsx";
import { OverviewSkeleton } from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Card from "../components/ui/Card.jsx";
import KpiRow from "../components/overview/KpiRow.jsx";
import ChartPanel from "../components/overview/ChartPanel.jsx";
import TopCompanies from "../components/overview/TopCompanies.jsx";
import { COLORS } from "../theme/colors.js";

export default function ExecutiveOverview() {
  const { loading, error, filteredCompanies } = useDashboard();

  if (loading) return <OverviewSkeleton />;

  if (error) {
    return (
      <Card accent={COLORS.bad} className="p-6">
        <p className="text-sm font-semibold">Could not load company data</p>
        <p className="mt-1 text-xs text-muted">{String(error.message ?? error)}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-semibold">Executive Overview</h1>
        <p className="mt-0.5 text-xs text-muted">
          AI readiness across {filteredCompanies.length} compan
          {filteredCompanies.length === 1 ? "y" : "ies"} in the portfolio
        </p>
      </header>

      {filteredCompanies.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <KpiRow companies={filteredCompanies} />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ChartPanel companies={filteredCompanies} delay={0.15} />
            </div>
            <TopCompanies companies={filteredCompanies} delay={0.2} />
          </div>
        </>
      )}
    </div>
  );
}
