import Card from "../components/ui/Card.jsx";

export default function StubPage({ title }) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-semibold">{title}</h1>
      </header>
      <Card className="p-6">
        <p className="text-xs text-muted">
          This view is coming soon — the Executive Overview is the first page
          built on the shared shell.
        </p>
      </Card>
    </div>
  );
}
