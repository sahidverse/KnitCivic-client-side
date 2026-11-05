"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Home,
  SearchX,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-8 text-foreground">
      {/* Animated Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 size-96 animate-pulse rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 animate-pulse rounded-full bg-secondary blur-[130px] [animation-delay:1s]" />

      {/* Floating Decorations */}
      <Sparkles className="absolute left-[15%] top-[20%] size-6 animate-float text-primary/60" />

      <Heart className="absolute right-[15%] top-[25%] size-8 animate-float-delayed text-primary/50" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Brand */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-heading text-lg font-bold tracking-tight transition-transform duration-300 hover:scale-105"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Heart size={20} fill="currentColor" />
          </span>
          Knit<span className="text-primary">Civic</span>
        </Link>

        {/* 404 Section */}
        <div className="relative mx-auto mb-8 flex items-center justify-center">
          {/* Number Glow */}
          <div className="absolute size-72 rounded-full bg-primary/15 blur-[90px] animate-pulse sm:size-96" />

          {/* Huge 404 */}
          <h1
            className="
              relative
              animate-appear
              bg-linear-to-b
              from-foreground
              via-primary/70
              to-primary
              bg-clip-text
              text-[clamp(12rem,32vw,24rem)]
              leading-[0.85]
              font-black
              tracking-[-0.09em]
              text-transparent
              drop-shadow-[0_10px_45px_color-mix(in_oklab,var(--primary)_20%,transparent)]
              select-none
            "
          >
            404
          </h1>

          {/* Floating Search Icon */}
          <div className="absolute -right-2 top-0 flex size-12 animate-float items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/10 sm:-right-5 sm:top-5 sm:size-16">
            <SearchX className="size-7 sm:size-9" />
          </div>

          {/* Small Floating Circle */}
          <div className="absolute -bottom-3 left-[12%] size-4 animate-bounce rounded-full bg-primary shadow-lg shadow-primary/50" />
        </div>

        {/* Message */}
        <div className="animate-slide-up space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary">
            <Sparkles size={13} />
            OOPS! PAGE NOT FOUND
          </span>

          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Looks Like You're
            <span className="mt-1 block text-primary">
              Lost in the Community!
            </span>
          </h2>

          <p className="mx-auto max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable. Let's get you back to making
            a difference!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex animate-slide-up flex-col items-center justify-center gap-4 [animation-delay:200ms] sm:flex-row">
          <Link
            href="/"
            className="
              group inline-flex w-full items-center justify-center gap-2
              rounded-full bg-primary
              px-7 py-3.5 text-sm font-semibold text-primary-foreground
              shadow-lg shadow-primary/20
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:shadow-primary/40
              sm:w-auto
            "
          >
            <Home size={17} />
            Back to Home
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-full border border-border bg-secondary
              px-7 py-3.5 text-sm font-semibold text-secondary-foreground
              transition-all duration-300
              hover:-translate-y-1 hover:border-primary/50
              hover:text-primary sm:w-auto
            "
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
