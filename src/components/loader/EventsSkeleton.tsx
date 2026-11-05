"use client";

import { Card, CardContent, Skeleton } from "@heroui/react";

export default function EventCreateSkeleton() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B1425] text-white">
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
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-5 pb-12 lg:grid-cols-[2fr_1.1fr]">
        {/* Event Details Form */}
        <Card className="rounded-2xl border border-white/10 bg-[#0D1427] shadow-none">
          <CardContent className="gap-7 p-6 sm:p-8">
            {/* Form Heading */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-5 rounded-md bg-default-300/20" />
                <Skeleton className="h-7 w-40 rounded-lg bg-default-300/20" />
              </div>

              <Skeleton className="h-4 w-72 max-w-full rounded-lg bg-default-300/20" />
            </div>

            {/* Event Title */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-28 rounded-lg bg-default-300/20" />
              <Skeleton className="h-14.5 w-full rounded-2xl bg-default-300/10" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 rounded-lg bg-default-300/20" />
              <Skeleton className="h-36 w-full rounded-2xl bg-default-300/10" />
            </div>

            {/* Event Type */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-28 rounded-lg bg-default-300/20" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-12 w-full rounded-xl bg-default-300/10"
                  />
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28 rounded-lg bg-default-300/20" />
                <Skeleton className="h-13.5 w-full rounded-xl bg-default-300/10" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-4 w-28 rounded-lg bg-default-300/20" />
                <Skeleton className="h-13.5 w-full rounded-xl bg-default-300/10" />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 rounded-lg bg-default-300/20" />
              <Skeleton className="h-13.5 w-full rounded-xl bg-default-300/10" />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-32 rounded-lg bg-default-300/20" />
              <Skeleton className="h-40 w-full rounded-2xl bg-default-300/10" />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-wrap justify-end gap-3">
              <Skeleton className="h-11 w-28 rounded-xl bg-default-300/15" />
              <Skeleton className="h-11 w-40 rounded-xl bg-pink-500/20" />
            </div>
          </CardContent>
        </Card>

        {/* ================= EVENT PREVIEW ================= */}
        <Card className="rounded-2xl border border-white/10 bg-[#0D1427] shadow-none">
          <CardContent className="gap-5 p-6">
            {/* Preview Heading */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-36 rounded-lg bg-default-300/20" />
              <Skeleton className="h-4 w-full rounded-lg bg-default-300/20" />
            </div>

            {/* Preview Image */}
            <div className="relative">
              <Skeleton className="aspect-video w-full rounded-xl bg-default-300/20" />

              {/* Event Type Badge */}
              <Skeleton className="absolute right-0 top-0 h-12 w-28 rounded-bl-xl rounded-tr-xl bg-success/20" />
            </div>

            {/* Event Title */}
            <div className="space-y-3">
              <Skeleton className="h-7 w-4/5 rounded-lg bg-default-300/20" />
              <Skeleton className="h-4 w-1/2 rounded-lg bg-default-300/20" />
            </div>

            {/* Event Information */}
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 shrink-0 rounded-md bg-pink-500/20" />
                  <Skeleton className="h-4 w-3/4 rounded-lg bg-default-300/20" />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Organizer */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full bg-default-300/20" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24 rounded-lg bg-default-300/20" />
                <Skeleton className="h-4 w-32 rounded-lg bg-default-300/20" />
              </div>
            </div>

            {/* Preview Button */}
            <Skeleton className="h-12 w-full rounded-xl bg-pink-500/20" />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
