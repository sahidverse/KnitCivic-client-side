import { Skeleton } from "@heroui/react";

const MESkeleton = () => {
  return (
    <div className="mx-auto  max-w-7xl">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 lg:min-h-115 lg:grid-cols-2 lg:gap-16">
        {/* Hero Content */}
        <div className="space-y-6">
          {/* Badge */}
          <Skeleton className="h-7 w-36 rounded-full bg-pink-500/15" />

          {/* Title */}
          <div className="space-y-3">
            <Skeleton className="h-10 w-64 max-w-full rounded-lg bg-default-300/20 sm:h-12 sm:w-80" />
            <Skeleton className="h-10 w-40 rounded-lg bg-pink-500/20 sm:h-12 sm:w-48" />
          </div>

          {/* Description */}
          <div className="max-w-md space-y-3">
            <Skeleton className="h-4 w-full rounded-lg bg-default-300/20" />
            <Skeleton className="h-4 w-11/12 rounded-lg bg-default-300/20" />
            <Skeleton className="h-4 w-3/4 rounded-lg bg-default-300/20" />
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto flex h-75 w-full max-w-120 items-center justify-center">
          {/* Main Image Placeholder */}
          <Skeleton className="h-65 w-[85%] rotate-[-5deg] rounded-[35%_15%_30%_15%] bg-default-300/20" />

          {/* Decorative Circle */}
          <Skeleton className="absolute left-[5%] top-[40%] h-20 w-20 rounded-full bg-pink-500/30" />

          {/* Decorative Vertical Shape */}
          <Skeleton className="absolute right-[2%] top-[10%] h-28 w-9 rounded-full bg-pink-500/20" />

          {/* Decorative Text */}
          <div className="absolute right-0 top-0 space-y-2">
            <Skeleton className="h-3 w-14 rounded-lg bg-default-300/20" />
            <Skeleton className="h-3 w-10 rounded-lg bg-default-300/20" />
            <Skeleton className="h-3 w-12 rounded-lg bg-default-300/20" />
          </div>
        </div>
      </section>
      <div className="w-full  space-y-3 mt-10">
        <Skeleton className="h-14  rounded" />
      </div>

      <div className="w-full  space-y-3 mt-10">
        <Skeleton className="h-8 w-1/4 rounded" />

        <div className="grid grid-cols-2 mt-8">
          <Skeleton className=" h-5  rounded" />

          <Skeleton className="h-8 ml-auto w-2/6 rounded" />
        </div>
      </div>

      <div className="w-full  space-y-3 mt-10 grid grid-cols-2  justify-between">
        <Skeleton className="h-40  w-3/6 rounded" />
        <div className="flex flex-col items-end">
          <Skeleton className="w-2/6 h-8  rounded mb-6" />
          <Skeleton className="w-2/6 h-8  rounded mb-6" />
          <Skeleton className="w-2/6 h-8  rounded" />
        </div>
      </div>
    </div>
  );
};

export default MESkeleton;
