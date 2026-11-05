"use client";

import { CalendarRange, HeartHandshake, UsersRound } from "lucide-react";

const stats = [
  {
    id: "events",
    value: "120+",
    label: "Events Organized",
    icon: CalendarRange,
  },
  {
    id: "volunteers",
    value: "5K+",
    label: "Active Volunteers",
    icon: UsersRound,
  },
  {
    id: "communities",
    value: "20+",
    label: "Communities Helped",
    icon: HeartHandshake,
  },
];

export function Stats() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="-mt-1 grid grid-cols-1 gap-2 rounded-3xl border border-border bg-card p-2 shadow-2xl shadow-black/30 sm:grid-cols-3 md:-mt-14 md:backdrop-blur">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 transition-colors hover:bg-muted/40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15">
              <stat.icon className="size-5 text-primary" />
            </span>
            <div>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
