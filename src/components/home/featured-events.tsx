import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "cn";
import { ReactNode } from "react";

interface RecentEvents {
  tag?: ReactNode;
  tagClass?: string;
  _id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  image: string;
  date: string;
  name: string;
  email: string;
  profileImg: string;
  joined: number;
}

export async function FeaturedEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recentevents`, {
    cache: "no-store",
  });
  const featuredEvents: RecentEvents[] = await res.json();
  console.log(featuredEvents);
  return (
    <section
      id="upcoming-events"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Recent Upcoming Events
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join upcoming events and be a part of{" "}
            <span className="text-pink-500">something meaningful</span>.
          </p>
        </div>
        <a
          href="/events/upcomingevents"
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
        >
          View All
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredEvents.map((event) => (
          <article
            key={event._id}
            className="group flex flex-col rounded-3xl border border-border bg-card shadow-xl shadow-black/20 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden rounded-t-3xl">
              <Image
                src={event.image}
                alt={event.title}
                width={640}
                height={420}
                className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className={cn(
                  "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
                  event.tagClass,
                )}
              >
                {event.tag}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium backdrop-blur">
                📅 {event.date}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
              <h3 className="text-base font-semibold">{event.title}</h3>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" />
                {event.location}
              </p>

              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {event.joined > 0 && (
                      <>
                        {Array.from({ length: event.joined }).map((_, i) => (
                          <Image
                            key={`${event._id}-${i}`}
                            src={`/avatars/v${i + 1}.jpg`}
                            alt="Volunteer"
                            width={24}
                            height={24}
                            className="size-6 rounded-full border-2 border-card object-cover"
                          />
                        ))}
                      </>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {event.joined} joined
                  </span>
                </div>

                <a
                  href={`/events/${event._id}`}
                  aria-label={`Join ${event.title}`}
                  className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
