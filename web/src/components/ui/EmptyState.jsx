import { useDashboard } from "../../context/DashboardContext.jsx";
import Card from "./Card.jsx";

export default function EmptyState() {
  const { clearFilters } = useDashboard();
  return (
    <Card className="flex flex-col items-center gap-4 px-8 py-16 text-center">
      <p className="text-sm font-semibold">No companies match these filters</p>
      <p className="max-w-sm text-xs text-muted">
        The current filter combination returns zero companies. Adjust a filter
        in the sidebar, or reset everything.
      </p>
      <button
        type="button"
        onClick={clearFilters}
        className="rounded border border-accent/40 px-4 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10"
      >
        Clear Filters
      </button>
    </Card>
  );
}
