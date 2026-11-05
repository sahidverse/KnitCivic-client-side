"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  LayoutGrid,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import {
  categoryById,
  eventCategories,
  fetchEvents,
  getEventCategoryId,
  type Event,
} from "./data";
import { CardSkeleton } from "@/components/loader/CardSkeleton";
import { FooterMain } from "@/components/layout/footer";

import UESkeleteon from "./UESkeleton";

type SortOption = "newest" | "oldest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const EVENTS_PER_PAGE = 6;

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type SelectOption = { value: string; label: string };

function FilterDropdown({
  icon,
  value,
  options,
  onChange,
  defaultValue,
  allLabel,
}: {
  icon: React.ReactNode;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  defaultValue: string;
  allLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full min-w-44 items-center gap-2.5 rounded-xl border border-border bg-background px-4 text-sm text-foreground transition-colors hover:border-primary/50"
      >
        <span className="shrink-0 text-muted-foreground">{icon}</span>
        <span className="flex-1 truncate text-left">
          {value === defaultValue ? allLabel : (selected?.label ?? allLabel)}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-border bg-popover py-1 shadow-xl shadow-black/40"
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={value === defaultValue}
              onClick={() => {
                onChange(defaultValue);
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
            >
              {allLabel}
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-muted ${
                  value === o.value ? "text-primary" : "text-foreground"
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventCard({
  event,
  favorited,
  onToggleFavorite,
}: {
  event: Event;
  favorited: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const categoryId = getEventCategoryId(event.type);
  const category = categoryId ? categoryById.get(categoryId) : undefined;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10 dark:shadow-black/30">
      <div className="relative aspect-12/5 shrink-0 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        {category && (
          <span
            className={`absolute left-0 top-0 rounded-br-2xl px-5 py-2.5 text-base font-semibold shadow-md shadow-black/20 ${category.badgeClass}`}
          >
            {category.label}
          </span>
        )}
        <button
          type="button"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorited}
          onClick={() => onToggleFavorite(event.id)}
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-transform hover:scale-105"
        >
          <Heart
            className={`size-5 ${favorited ? "fill-primary text-primary" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0 text-primary" />
          {formatDate(event.date)}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />
          {event.location}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        {typeof event.joined === "number" && (
          <p className="flex items-center gap-2 pb-2 text-sm text-foreground/80">
            <Users className="size-4 shrink-0" />
            {event.joined} people already joined
          </p>
        )}
        {event.name && (
          <p className="text-xs text-muted-foreground">
            Organized by {event.name}
          </p>
        )}
        <Link
          href={`/events/${encodeURIComponent(event.id)}`}
          className="mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          View Details
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const loadedEvents = await fetchEvents(controller.signal);
        setEvents(loadedEvents);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load events.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadEvents();
    return () => controller.abort();
  }, [retryCount]);

  const locationOptions: SelectOption[] = [
    ...new Set(events.map((e) => e.location)),
  ].map((loc) => ({ value: loc, label: loc }));

  const filtered = events
    .filter(
      (e) =>
        e.title.toLowerCase().includes(query.trim().toLowerCase()) &&
        (category === "all" || getEventCategoryId(e.type) === category) &&
        (location === "all" || e.location === location),
    )
    .sort((a, b) => {
      if (sort === "newest") return Date.parse(b.date) - Date.parse(a.date);
      return Date.parse(a.date) - Date.parse(b.date);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / EVENTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * EVENTS_PER_PAGE,
    safePage * EVENTS_PER_PAGE,
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateFilter =
    <T,>(setter: (v: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  if (isLoading) {
    return <UESkeleteon />;
  }

  return (
    <div className="min-h-svh bg-background">
      <main className="h-full flex-1">
        {/* Hero band */}
        <section className="relative mx-3 mt-3 overflow-hidden rounded-[2rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-primary/15 blur-[110px]"
          />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Heart className="size-3.5" fill="currentColor" />
                Together We Can
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Upcoming <span className="text-primary">Events</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                Discover and join community events that make a difference.
                Together, we can build a brighter, healthier and more
                sustainable world.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden
                className="absolute -left-5 top-1/2 size-20 -translate-y-1/2 rounded-full bg-primary"
              />
              <div
                aria-hidden
                className="absolute -right-3 top-8 h-28 w-9 rounded-full bg-primary"
              />
              <div
                aria-hidden
                className="absolute -left-3 bottom-8 z-10 h-5 w-8 text-sky-400"
              >
                <svg viewBox="0 0 24 12" fill="none" className="size-full">
                  <path
                    d="M1 9 5 3l4 6 4-6 4 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                aria-hidden
                className="font-script pointer-events-none absolute -right-8 top-2 hidden rotate-10deg text-center text-xl leading-tight text-foreground lg:block"
              >
                Be a Part
                <br />
                of the
                <br />
                Change!
              </span>
              <div className="w-full">
                <svg viewBox="0 0 243 184" className="w-full h-auto">
                  <defs>
                    <clipPath id="customBlob" clipPathUnits="userSpaceOnUse">
                      <path d="M 25.5,24 Q 17,33 12.5,45 Q 8,57 6,66 Q 4,75 2,91 Q 0,107 0,118.5 Q 0,130 1,138 Q 2,146 5,155.5 Q 8,165 14.5,172 Q 21,179 31.5,180.5 Q 42,182 61,182 Q 80,182 110,175.5 Q 140,169 156.5,171 Q 173,173 185,172.5 Q 197,172 202,170.5 Q 207,169 214.5,164.5 Q 222,160 226.5,155 Q 231,150 234.5,143.5 Q 238,137 240,129.5 Q 242,122 242,116 Q 242,110 238.5,100.5 Q 235,91 221.5,77.5 Q 208,64 202.5,55 Q 197,46 189.5,41 Q 182,36 173,34.5 Q 164,33 144.5,21.5 Q 125,10 109,5 Q 93,0 84.5,0 Q 76,0 62,3 Q 48,6 41,10.5 Q 34,15 25.5,24 Z" />
                    </clipPath>
                  </defs>

                  <image
                    href="/images/upcomingevents.png"
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

        {/* Filter bar */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => updateFilter(setQuery)(e.target.value)}
                placeholder="Search events by title..."
                className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>
            <FilterDropdown
              icon={<LayoutGrid className="size-4" />}
              value={category}
              options={eventCategories.map((c) => ({
                value: c.id,
                label: c.label,
              }))}
              onChange={updateFilter(setCategory)}
              defaultValue="all"
              allLabel="All Event Categories"
            />
            <FilterDropdown
              icon={<MapPin className="size-4" />}
              value={location}
              options={locationOptions}
              onChange={updateFilter(setLocation)}
              defaultValue="all"
              allLabel="All Locations"
            />
            <FilterDropdown
              icon={<ArrowDownWideNarrow className="size-4" />}
              value={sort}
              options={sortOptions}
              onChange={(value) => {
                if (value === "newest" || value === "oldest") {
                  updateFilter(setSort)(value);
                }
              }}
              defaultValue="newest"
              allLabel="Newest First"
            />
          </div>

          <h2 className="mt-10 text-lg font-semibold text-foreground/90">
            Explore upcoming events
          </h2>

          {loadError ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-destructive/30 bg-card p-10 text-center"
            >
              <p className="text-sm text-destructive">{loadError}</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            // <p
            //   role="status"
            //   className="mt-6 rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground"
            // >
            //   Loading events...
            // </p>
            <div className="flex gap-5">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : paged.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              {events.length === 0
                ? "No events available yet."
                : "No events match your search. Try different filters."}
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  favorited={favorites.has(event.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Event pages"
              className="mt-10 flex items-center justify-center gap-2 pb-4"
            >
              <button
                type="button"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-current={n === safePage ? "page" : undefined}
                  onClick={() => setPage(n)}
                  className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    n === safePage
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </nav>
          )}
        </section>
      </main>
      <FooterMain />
    </div>
  );
}
