import Card from "../ui/Card.jsx";

function hostLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function SourceLinks({ company, delay = 0 }) {
  const links = [company.sourceUrl1, company.sourceUrl2, company.sourceUrl3]
    .map((u) => (u ?? "").trim())
    .filter(Boolean);

  return (
    <Card delay={delay} className="p-5">
      <h3 className="text-sm font-semibold">Sources</h3>
      {links.length === 0 ? (
        <p className="mt-2 text-xs text-muted">No source links on file.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {links.map((url, i) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs text-accent transition-colors hover:text-ink"
              >
                <span className="font-mono text-[10px] text-muted">
                  {i + 1}
                </span>
                <span className="min-w-0 truncate">{hostLabel(url)}</span>
                <svg
                  aria-hidden
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 opacity-70 group-hover:opacity-100"
                >
                  <path
                    d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
