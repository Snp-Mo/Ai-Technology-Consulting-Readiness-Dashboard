import Card from "../ui/Card.jsx";
import { COLORS } from "../../theme/colors.js";

function NarrativeCard({ title, text, accent, delay }) {
  const body = (text ?? "").trim();
  return (
    <Card accent={accent} delay={delay} className="p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      {body ? (
        <p className="mt-2 text-xs leading-relaxed text-muted">{body}</p>
      ) : (
        <p className="mt-2 text-xs italic text-muted/70">
          Needs review — no {title.toLowerCase()} on file.
        </p>
      )}
    </Card>
  );
}

export default function AiNarrative({ company, delay = 0 }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <NarrativeCard
        title="AI Summary"
        text={company.aiSummary}
        accent={COLORS.accent}
        delay={delay}
      />
      <NarrativeCard
        title="AI Recommendation"
        text={company.aiRecommendation}
        accent={COLORS.accent}
        delay={delay + 0.05}
      />
    </div>
  );
}
