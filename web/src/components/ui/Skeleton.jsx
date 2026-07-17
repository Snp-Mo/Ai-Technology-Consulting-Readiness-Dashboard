export function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded bg-white/5 motion-reduce:animate-none ${className}`}
    />
  );
}

/** Placeholder mirroring the Industry Comparison layout while the CSV loads. */
export function IndustriesSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard data" className="space-y-5">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <Skeleton className="h-96" />
      <Skeleton className="h-80" />
    </div>
  );
}

/** Placeholder mirroring the Executive Overview layout while the CSV loads. */
export function OverviewSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard data" className="space-y-5">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="col-span-2 h-96" />
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
