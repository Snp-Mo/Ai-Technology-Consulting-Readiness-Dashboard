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

/** Placeholder mirroring the Company Deep Dive layout while the CSV loads. */
export function DeepDiveSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard data" className="space-y-5">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-10 w-full max-w-md" />
      <Skeleton className="h-28" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}

/** Placeholder mirroring the GRC & Risk View layout while the CSV loads. */
export function GrcSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard data" className="space-y-5">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-72" />
        <Skeleton className="col-span-2 h-72" />
      </div>
      <Skeleton className="h-80" />
      <Skeleton className="h-64" />
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
