"use client";

import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroAvatars = [1, 2, 3, 4, 5];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative glows + shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-indigo-600/25 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-24 hidden size-14 rotate-45 rounded-2xl bg-linear-to-br from-pink-400 to-fuchsia-600 opacity-70 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 hidden size-10 rotate-12 rounded-xl bg-linear-to-br from-pink-400 to-fuchsia-600 opacity-70 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-8 hidden size-6 rounded-full bg-blue-400/70 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-24 bottom-6 hidden size-4 rounded-full bg-blue-400/70 lg:block"
      />
      <span
        aria-hidden
        className="font-script pointer-events-none absolute right-6 top-6 hidden rotate-[8deg] text-2xl leading-none text-foreground lg:block"
      >
        Better Communities
        <br />
        Together
      </span>
      <Heart
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 hidden size-5 text-primary lg:block"
        fill="currentColor"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center rounded-full  px-4 py-1.5 text-xs font-semibold text-foreground shadow-lg shadow-primary/30 border border-primary">
            Together We Can
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Small Actions
            <br />
            Create <span className="text-primary">Big Change</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Join our community of kind people and take part in meaningful events
            that help build a better, stronger and more compassionate society.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 ">
            <Button
              size="lg"
              className="rounded-full px-6 py-5 shadow-lg shadow-primary/30 group"
            >
              Explore Events
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 cursor-pointer" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border border-slate-400  px-6 py-5 hover:bg-muted cursor-pointer"
            >
              Create Event
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {heroAvatars.map((n) => (
                <Image
                  key={n}
                  src={`/avatars/v${n}.jpg`}
                  alt="Volunteer"
                  width={36}
                  height={36}
                  className="size-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">10K+</p>
              <p className="text-xs text-muted-foreground">Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* Blob image */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            aria-hidden
            className="absolute -left-10 top-1/2 -z-10 size-24 -translate-y-1/2 bg-linear-to-br from-pink-400 to-fuchsia-600 opacity-80 rounded-[45%_55%_60%_40%/55%_45%_55%_45%]"
          />
          <div
            aria-hidden
            className="absolute -right-6 bottom-10 -z-10 size-16 bg-linear-to-br from-blue-400 to-indigo-600 opacity-80 rounded-[55%_45%_40%_60%/55%_55%_45%_45%]"
          />
          {/* <div className="overflow-hidden rounded-[12%_38%_32%_18%/30%_20%_28%_40%]">
            <Image
              src="/images/Volunteer.png"
              alt="Volunteers in matching shirts standing together"
              width={720}
              height={720}
              priority
              className="aspect-square w-full object-cover"
            />
          </div> */}
          <div className="w-full">
            <svg viewBox="0 0 243 184" className="w-full h-auto">
              <defs>
                <clipPath id="customBlob" clipPathUnits="userSpaceOnUse">
                  <path d="M 25.5,24 Q 17,33 12.5,45 Q 8,57 6,66 Q 4,75 2,91 Q 0,107 0,118.5 Q 0,130 1,138 Q 2,146 5,155.5 Q 8,165 14.5,172 Q 21,179 31.5,180.5 Q 42,182 61,182 Q 80,182 110,175.5 Q 140,169 156.5,171 Q 173,173 185,172.5 Q 197,172 202,170.5 Q 207,169 214.5,164.5 Q 222,160 226.5,155 Q 231,150 234.5,143.5 Q 238,137 240,129.5 Q 242,122 242,116 Q 242,110 238.5,100.5 Q 235,91 221.5,77.5 Q 208,64 202.5,55 Q 197,46 189.5,41 Q 182,36 173,34.5 Q 164,33 144.5,21.5 Q 125,10 109,5 Q 93,0 84.5,0 Q 76,0 62,3 Q 48,6 41,10.5 Q 34,15 25.5,24 Z" />
                </clipPath>
              </defs>

              <image
                href="/images/Volunteer.png"
                width="243"
                height="184"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#customBlob)"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
