import { Skeleton } from "@heroui/react";

export function CardSkeleton() {
  return (
    <div className="shadow-panel w-88 space-y-5 rounded-lg bg-transparent p-4">
      <Skeleton className="h-32 rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/5 rounded-lg" />
        <Skeleton className="h-5 w-4/5 rounded-lg" />
        <Skeleton className="h-5 w-2/5 rounded-lg" />
        <Skeleton className="h-5 w-3/5 rounded-lg" />
        <Skeleton className="h-5 w-3/4 rounded-lg" />
      </div>
    </div>
  );
}
