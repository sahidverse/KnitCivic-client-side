"use client";

import { Skeleton, Card, CardContent } from "@heroui/react";

export default function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-[#0B1425] px-5 py-8 text-white md:px-9">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-3 w-36 rounded-lg bg-default-300/20" />
        <Skeleton className="h-9 w-44 rounded-lg bg-default-300/20" />
        <Skeleton className="h-4 w-80 max-w-full rounded-lg bg-default-300/20" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.25fr]">
        {/* Profile Card */}
        <Card className="overflow-hidden border border-white/10 bg-[#0D1427] shadow-none">
          <CardContent className="p-0">
            {/* Profile Header */}
            <div className="relative bg-linear-to-r from-pink-500/20 to-purple-500/10 px-6 pb-10 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-40 rounded-lg bg-default-300/30" />
                  <Skeleton className="h-6 w-48 rounded-lg bg-default-300/30" />
                </div>

                <Skeleton className="h-10 w-32 rounded-full bg-default-300/30" />
              </div>
            </div>

            {/* Profile Details */}
            <div className="px-6 pb-7">
              {/* Avatar */}
              <div className="-mt-12 mb-6">
                <div className="relative w-fit">
                  <Skeleton className="h-24 w-24 rounded-full border-4 border-[#0D1427]" />
                  <Skeleton className="absolute bottom-0 right-0 h-4 w-4 rounded-full" />
                </div>
              </div>

              {/* Name */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Skeleton className="h-7 w-32 rounded-lg" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              {/* Email */}
              <Skeleton className="mb-6 h-4 w-40 rounded-lg" />

              {/* Bio */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <Skeleton className="h-3 w-1/2 rounded-lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card className="border border-white/10 bg-[#0D1427] shadow-none">
          <CardContent className="p-6">
            {/* Heading */}
            <div className="mb-7 space-y-3">
              <Skeleton className="h-3 w-48 rounded-lg" />
              <Skeleton className="h-6 w-36 rounded-lg" />
              <Skeleton className="h-4 w-full max-w-md rounded-lg" />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  className="min-h-52.5 border border-white/10 bg-[#111B30] shadow-none"
                >
                  <CardContent className="flex flex-col gap-4 p-5">
                    {/* Icon */}
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-12 w-12 rounded-2xl" />
                      <Skeleton className="h-5 w-5 rounded-md" />
                    </div>

                    {/* Number */}
                    <Skeleton className="h-8 w-16 rounded-lg" />

                    {/* Title */}
                    <Skeleton className="h-4 w-28 rounded-lg" />

                    {/* Description */}
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full rounded-lg" />
                      <Skeleton className="h-3 w-3/4 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}
      <Card className="mt-8 border border-white/10 bg-[#0D1427] shadow-none">
        <CardContent className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <Skeleton className="mt-1 h-6 w-6 shrink-0 rounded-full" />

            <div className="space-y-3">
              <Skeleton className="h-5 w-56 max-w-full rounded-lg" />
              <Skeleton className="h-4 w-80 max-w-full rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-10 w-44 shrink-0 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}
