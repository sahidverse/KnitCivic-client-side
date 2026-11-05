"use client";

import {
  ArrowRight,
  GraduationCap,
  Leaf,
  Trash2,
  HandHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  cardClass: string;
  iconClass: string;
}[] = [
  {
    id: "donation",
    title: "Donation",
    subtitle: "Spread kindness",
    icon: HandHeart,
    cardClass: "bg-gradient-to-br from-pink-500 to-fuchsia-700 text-white",
    iconClass: "bg-white/20 text-white",
  },
  {
    id: "plantation",
    title: "Plantation",
    subtitle: "Greener tomorrow",
    icon: Leaf,
    cardClass: "bg-gradient-to-br from-emerald-600 to-teal-800 text-white",
    iconClass: "bg-white/20 text-white",
  },
  {
    id: "cleanup",
    title: "Cleanup",
    subtitle: "Cleaner communities",
    icon: Trash2,
    cardClass: "bg-gradient-to-br from-blue-500 to-indigo-700 text-white",
    iconClass: "bg-white/20 text-white",
  },
  {
    id: "education",
    title: "Education",
    subtitle: "Brighter future",
    icon: GraduationCap,
    cardClass: "bg-gradient-to-br from-violet-600 to-purple-900 text-white",
    iconClass: "bg-white/20 text-white",
  },
];

export function EventCategories() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Explore Event Categories
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Find events that match
        <span className="text-pink-500"> your passion</span> and make a
        difference.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            key={category.id}
            href="#"
            className={[
              "group relative flex flex-col rounded-3xl p-5 shadow-lg transition-transform duration-200 hover:-translate-y-1",
              category.cardClass,
            ].join(" ")}
          >
            <span
              className={[
                "flex size-12 items-center justify-center rounded-2xl text-2xl",
                category.iconClass,
              ].join(" ")}
            >
              <category.icon className="size-6" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{category.title}</h3>
            <p className="mt-0.5 text-xs opacity-80">{category.subtitle}</p>
            <ArrowRight className="absolute bottom-5 right-5 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        ))}
      </div>
    </section>
  );
}
