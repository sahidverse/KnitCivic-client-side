import { Skeleton } from "@heroui/react";

export function HeadingSkeleton() {
  return (
    <div className="w-full  space-y-3">
      <Skeleton className="h-8 w-1/4 rounded" />
      <Skeleton className="h-4 w-1/5 rounded" />
      <div className="grid grid-cols-2 mt-8">
        <div className="grid grid-cols-3 gap-3 w-1/2 ">
          <Skeleton className="h-8  rounded" />
          <Skeleton className="h-8  rounded" />
          <Skeleton className="h-8  rounded" />
        </div>
        <Skeleton className="h-8 ml-auto w-3/6 rounded" />
      </div>
    </div>
  );
}
