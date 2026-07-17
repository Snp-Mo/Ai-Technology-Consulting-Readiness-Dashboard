import { useState } from "react";
import Card from "../ui/Card.jsx";
import TabSwitcher from "../ui/TabSwitcher.jsx";
import CategoryBarChart from "../charts/CategoryBarChart.jsx";
import ReadinessRiskScatter from "../charts/ReadinessRiskScatter.jsx";
import IndustryCategoryHeatmap from "../charts/IndustryCategoryHeatmap.jsx";
import { INDUSTRY_ORDER, INDUSTRY_COLORS } from "../../theme/colors.js";

const TABS = ["Bar", "Scatter", "Heatmap"];

const TAB_META = {
  Bar: { title: "Average score by category", Chart: CategoryBarChart },
  Scatter: { title: "Readiness vs GRC risk", Chart: ReadinessRiskScatter },
  Heatmap: { title: "Industry × category averages", Chart: IndustryCategoryHeatmap },
};

function IndustryLegend({ industries }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 px-1 pt-3">
      {industries.map((industry) => (
        <li
          key={industry}
          className="flex items-center gap-1.5 text-[10px] text-muted"
        >
          <span
            aria-hidden
            className="size-2 rounded-full"
            style={{ backgroundColor: INDUSTRY_COLORS[industry] }}
          />
          {industry}
        </li>
      ))}
    </ul>
  );
}

export default function ChartPanel({ companies, delay = 0 }) {
  const [tab, setTab] = useState("Bar");
  const { title, Chart } = TAB_META[tab];
  const presentIndustries = INDUSTRY_ORDER.filter((ind) =>
    companies.some((c) => c.industry === ind),
  );

  return (
    <Card delay={delay} className="flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <TabSwitcher tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div className="h-72">
        <Chart companies={companies} />
      </div>
      {tab === "Scatter" && (
        <>
          {presentIndustries.length > 1 && (
            <IndustryLegend industries={presentIndustries} />
          )}
          <p className="px-1 pt-2 text-[10px] text-muted">
            Larger dots mark points shared by several companies — hover to list
            them.
          </p>
        </>
      )}
    </Card>
  );
}
