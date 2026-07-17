import { INDUSTRY_COLORS } from "../../theme/colors.js";

/** Color-dot legend for charts with one series per industry. */
export default function IndustryLegend({ industries }) {
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
