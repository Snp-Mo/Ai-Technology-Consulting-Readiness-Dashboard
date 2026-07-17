import { useDashboard } from "../context/DashboardContext.jsx";
import { IndustriesSkeleton } from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Card from "../components/ui/Card.jsx";
import IndustryCards from "../components/industries/IndustryCards.jsx";
import IndustryCategoryBars from "../components/charts/IndustryCategoryBars.jsx";
import IndustryReadinessStrip from "../components/charts/IndustryReadinessStrip.jsx";
import IndustryLegend from "../components/charts/IndustryLegend.jsx";
import { COLORS, INDUSTRY_ORDER } from "../theme/colors.js";

export default function IndustryComparison() {
  const { loading, error, filteredCompanies } = useDashboard();

  if (loading) return <IndustriesSkeleton />;

  if (error) {
    return (
      <Card accent={COLORS.bad} className="p-6">
        <p className="text-sm font-semibold">Could not load company data</p>
        <p className="mt-1 text-xs text-muted">{String(error.message ?? error)}</p>
      </Card>
    );
  }

  const industries = INDUSTRY_ORDER.filter((ind) =>
    filteredCompanies.some((c) => c.industry === ind),
  );

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-semibold">Industry Comparison</h1>
        <p className="mt-0.5 text-xs text-muted">
          Average scores and readiness spread across {industries.length}{" "}
          industr{industries.length === 1 ? "y" : "ies"}
        </p>
      </header>

      {filteredCompanies.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <IndustryCards companies={filteredCompanies} />

          <Card delay={0.15} className="p-5">
            <h2 className="text-sm font-semibold">
              Category averages by industry
            </h2>
            <div className="mt-4 h-80">
              <IndustryCategoryBars companies={filteredCompanies} />
            </div>
            {industries.length > 1 && (
              <IndustryLegend industries={industries} />
            )}
          </Card>

          <Card delay={0.2} className="p-5">
            <h2 className="text-sm font-semibold">Readiness score spread</h2>
            <div className="mt-4 h-72">
              <IndustryReadinessStrip companies={filteredCompanies} />
            </div>
            <p className="px-1 pt-2 text-[10px] text-muted">
              Each dot is a company's overall readiness score; larger dots mark
              scores shared by several companies — hover to list them.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
