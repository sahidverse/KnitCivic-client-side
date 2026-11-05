"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Grid2X2,
  ListFilter,
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarX,
} from "lucide-react";
import { toast } from "sonner";
import HeroPage from "@/components/events/HeroPage";
import { authClient } from "@/lib/auth-client";
import { CardSkeleton } from "@/components/loader/CardSkeleton";
import {
  fetchEventsByEmail,
  getEventCategoryId,
  type Event,
} from "../upcomingevents/data";
import { FooterMain } from "@/components/layout/footer";
import { usePathname, useSearchParams } from "next/navigation";
import { DeleteDialog } from "@/components/DeleteDialog";
import MESkeleton from "./MESkeleton";

const categories = [
  "All Event Types",
  "Plantation",
  "Donation",
  "Cleanup",
  "Education",
  "Healthcare",
];

const categoryColors: Record<string, string> = {
  Plantation: "bg-[#13b981]",
  Donation: "bg-[#f16b79]",
  Cleanup: "bg-[#20b6d5]",
  Education: "bg-[#9b65db]",
  Healthcare: "bg-[#0693e3]",
};

function isUpcoming(date: string) {
  const eventDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(eventDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
}

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ManageEventsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const { data, isPending } = authClient.useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loadedRequest, setLoadedRequest] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Event Types");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const userEmail = data?.user?.email;
  const requestKey = userEmail ? `${userEmail}:${retryCount}` : null;
  const isLoading =
    isPending || Boolean(userEmail && loadedRequest !== requestKey);
  const currentLoadError = loadedRequest === requestKey ? loadError : null;

  useEffect(() => {
    if (isPending || !userEmail) return;

    const email = userEmail;
    const key = `${email}:${retryCount}`;
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const userEvents = await fetchEventsByEmail(email, controller.signal);
        if (controller.signal.aborted) return;

        setEvents(userEvents);
        setCurrentPage(1);
        setLoadError(null);
        setLoadedRequest(key);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load your events.",
          );
          setLoadedRequest(key);
        }
      }
    }

    void loadEvents();
    return () => controller.abort();
  }, [isPending, userEmail, retryCount]);

  const EVENTS_PER_PAGE = 4;

  // SEARCH + FILTER + SORT
  const filteredEvents = (() => {
    let result = [...events];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query),
      );
    }

    if (category !== "All Event Types") {
      result = result.filter((event) => {
        const eventCategory = getEventCategoryId(event.type);
        const selectedCategory = getEventCategoryId(category);
        return eventCategory
          ? eventCategory === selectedCategory
          : event.type.toLowerCase() === category.toLowerCase();
      });
    }

    result.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  })();

  // PAGINATION
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  // DELETE EVENT
  const handleDelete = async (id: string) => {
    if (!userEmail) {
      toast.error("Please log in to manage your events.");
      return;
    }

    try {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      const headers: Record<string, string> = {};
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${encodeURIComponent(userEmail)}/${id}`,
        {
          method: "DELETE",
          headers,
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete event.");
      }

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Event deleted successfully!");
        // Immediately remove the deleted event from the UI list
        setEvents((prev) => prev.filter((event) => event.id !== id));
      } else {
        toast.error("Event not found or already deleted.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the event.",
      );
    }
  };
  if (isPending) {
    return <MESkeleton />;
  }

  return (
    <>
      <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
        <HeroPage
          title="Manage Your"
          highlight="Events"
          badge="Your Community Impact"
          description="Manage the events you've created, track participation, and keep your community engaged."
          image="/images/manageevents.jpg"
        />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* SEARCH AND FILTER BAR */}
          <section className="mb-7 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-4 md:grid-cols-[minmax(0,1fr)_220px_220px]">
            {/* Search */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search your events..."
                className="h-15 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {/* Category filter */}
            <div className="relative">
              <Grid2X2
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
              />

              <select
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
                className="h-15 w-full appearance-none rounded-xl border border-border bg-background pl-11 pr-9 text-sm text-foreground outline-none focus:border-primary"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDownIcon />
            </div>

            {/* Sort */}
            <div className="relative">
              <ListFilter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
              />

              <select
                value={sort}
                onChange={(e) => handleSort(e.target.value)}
                className="h-15 w-full appearance-none rounded-xl border border-border bg-background pl-11 pr-9 text-sm text-foreground outline-none focus:border-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              <ChevronDownIcon />
            </div>
          </section>

          {/* HEADING */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Your Created Events ({filteredEvents.length})
              </h1>

              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Manage the events you&apos;ve created and keep your community
                engaged.
              </p>
            </div>

            <Link
              href="/events/create-event"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Plus size={18} />
              Create Event
            </Link>
          </div>

          {/* EVENT LIST */}
          {currentLoadError ? (
            <div
              role="alert"
              className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-card px-5 py-20 text-center"
            >
              <p className="text-sm text-destructive">{currentLoadError}</p>
              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col gap-5">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : !userEmail ? (
            <div className="rounded-2xl border border-border bg-card px-5 py-20 text-center">
              <p className="text-sm text-muted-foreground">
                Sign in to view your created events.
              </p>
            </div>
          ) : paginatedEvents.length > 0 ? (
            <div className="space-y-5">
              {paginatedEvents.map((event) => {
                const upcoming = isUpcoming(event.date);
                const detailsUrl = `/events/${event.id}?returnTo=${encodeURIComponent(
                  currentUrl,
                )}`;

                return (
                  <article
                    key={event.id}
                    className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 lg:grid-cols-[260px_minmax(0,1fr)_195px] lg:items-center"
                  >
                    {/* IMAGE */}
                    <div className="relative h-45 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                      <span
                        className={`absolute left-0 top-0 min-w-38.75 rounded-br-xl px-4 py-4 text-base font-semibold text-white ${
                          categoryColors[event.type] || "bg-[#ff397e]"
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>

                    {/* EVENT INFORMATION */}
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                        {event.title}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                        <CalendarDays size={16} className="text-primary" />
                        {formatDate(event.date)}
                        {event.time ? ` • ${event.time}` : ""}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={17} className="shrink-0 text-primary" />
                        <span>{event.location}</span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {event.description}
                      </p>

                      {event.createdAt && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Created on {formatDate(event.createdAt)}
                        </p>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-2">
                      <div className="mb-2 flex justify-start lg:justify-center">
                        <span
                          className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${
                            upcoming
                              ? "bg-[#064b3b]/70 text-[#13c98b]"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              upcoming ? "bg-[#13c98b]" : "bg-[#91a2b8]"
                            }`}
                          />
                          {upcoming ? "Upcoming" : "Completed"}
                        </span>
                      </div>

                      <Link
                        href={detailsUrl}
                        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground"
                      >
                        <Eye size={17} />
                        View Details
                      </Link>

                      <Link
                        href={`/events/edit/${event.id}`}
                        className="flex h-10 items-center justify-center gap-2 rounded-xl bg-muted-foreground/30 text-sm font-semibold text-foreground/80 transition hover:bg-muted-foreground/60"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      <DeleteDialog
                        handleDelete={handleDelete}
                        id={event.id}
                        title={event.title}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* EMPTY SEARCH RESULT */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-5 py-20 text-center">
              <CalendarX size={48} className="text-primary" />

              <h2 className="mt-5 text-xl font-bold">No Events Found</h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                We couldn&apos;t find any events matching your search. Try
                another keyword or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Event Types");
                  setCurrentPage(1);
                }}
                className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={19} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-bold transition ${
                      currentPage === page
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          )}
        </div>
      </main>
      <FooterMain />
    </>
  );
}

function ChevronDownIcon() {
  return (
    <ChevronRight
      size={17}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground"
    />
  );
}
