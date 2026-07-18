import { useDashboard } from "../context/DashboardContext.jsx";
import { RecommendationsSkeleton } from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Card from "../components/ui/Card.jsx";
import RecKpiRow from "../components/recommendations/RecKpiRow.jsx";
import OpportunityLeaderboard from "../components/recommendations/OpportunityLeaderboard.jsx";
import PrioritySplit from "../components/recommendations/PrioritySplit.jsx";
import RecommendationFeed from "../components/recommendations/RecommendationFeed.jsx";
import { COLORS } from "../theme/colors.js";

export default function Recommendations() {
  const { loading, error, filteredCompanies } = useDashboard();

  if (loading) return <RecommendationsSkeleton />;

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
        <h1 className="text-xl font-semibold">Recommendations</h1>
        <p className="mt-0.5 text-xs text-muted">
          Automation opportunities and AI recommendations across{" "}
          {filteredCompanies.length} compan
          {filteredCompanies.length === 1 ? "y" : "ies"}
        </p>
      </header>

      {filteredCompanies.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <RecKpiRow companies={filteredCompanies} />

          <OpportunityLeaderboard companies={filteredCompanies} delay={0.15} />

          <PrioritySplit companies={filteredCompanies} delay={0.2} />

          <RecommendationFeed companies={filteredCompanies} delay={0.3} />
        </>
      )}
    </div>
  );
}
