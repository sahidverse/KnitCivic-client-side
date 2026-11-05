"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CalendarPlus,
  MapPin,
  Layers3,
  Image as ImageIcon,
  Info,
  LockKeyhole,
  Leaf,
  ArrowLeft,
} from "lucide-react";
import HeroPage from "@/components/events/HeroPage";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FooterMain } from "@/components/layout/footer";
import EventCreateSkeleton from "@/components/loader/EventsSkeleton";

const eventTypes = [
  "Cleanup",
  "Charity",
  "Education",
  "Environment",
  "Healthcare",
  "Donation",
  "Community Service",
  "Other",
];

const eventInputClass =
  "w-full rounded-xl border border-border bg-background text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary";

export default function CreateEventPage() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const currentUser = data?.user;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    image: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const minDate = getMinDate();

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      name: currentUser?.name ?? "",
      email: currentUser?.email ?? "",
      profileImg: currentUser?.image ?? "",
    }));

    if (field === "image") {
      setImageError(false);
    }
  };

  const formattedDate = formData.date
    ? new Date(`${formData.date}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Event Date";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if user is logged in
    if (!currentUser?.email) {
      toast.error("Please sign in before creating an event.");
      router.push("/login?callbackURL=/events/create-event");
      return;
    }

    let token: string | undefined;
    try {
      const { data: jwtData } = await authClient.token();
      token = jwtData?.token;
    } catch (err) {
      console.error("Failed to retrieve auth token:", err);
    }

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.type ||
      !formData.location.trim() ||
      !formData.image.trim() ||
      !formData.date
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^https?:\/\/.+/i.test(formData.image)) {
      toast.error("Please enter a valid thumbnail image URL (http/https).");
      return;
    }

    const selectedDate = new Date(`${formData.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setLoading(true);

      // Prepare complete beginner-friendly event payload
      const eventPayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type,
        location: formData.location.trim(),
        image: formData.image.trim(),
        date: formData.date,
        name: currentUser.name || "Community Organizer",
        email: currentUser.email,
        profileImg: currentUser.image || "",
        joined: 0,
        createdAt: new Date().toISOString(),
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-event`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(eventPayload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create event");
      }

      toast.success("Event created successfully!");
      // Redirect user to their managed events page to see the newly created event
      router.push("/events/manage-event");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <EventCreateSkeleton />;
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
        <HeroPage
          title="Create an"
          highlight="Event"
          badge="Make a Difference"
          description="Have an idea that can bring people together? Create an event and inspire your community to make a positive change."
          image="/images/createevents.png"
        />
        {/* Decorative background */}
        <div className="pointer-events-none absolute bottom-16 right-10 hidden text-sky-500/30 lg:block">
          <Leaf size={260} strokeWidth={1.5} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-4 sm:px-6 lg:grid-cols-[2fr_1.08fr]">
          {/* LEFT: EVENT FORM */}
          <section className="rounded-xl border border-border bg-card p-5 sm:p-8">
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.back()}
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="Go back"
                >
                  <ArrowLeft size={19} />
                </button>

                <h1 className="text-2xl font-bold tracking-tight">
                  Event Details
                </h1>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Fill in the information below to create your event.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Event title */}
              <div>
                <FieldLabel label="Event Title" />

                <input
                  type="text"
                  value={formData.title}
                  name="title"
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Winter Clothes Distribution"
                  className={`${eventInputClass} h-14.5 px-4`}
                  maxLength={100}
                />
              </div>

              {/* Description */}
              <div>
                <FieldLabel label="Description" />

                <textarea
                  value={formData.description}
                  name="description"
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Tell us about your event, what you'll do, and why it matters..."
                  className={`${eventInputClass} min-h-42.5 resize-y px-4 py-4`}
                  maxLength={1000}
                />

                <p className="mt-2 text-right text-xs text-muted-foreground">
                  {formData.description.length}/1000
                </p>
              </div>

              {/* Event type + Location */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel label="Event Type" />

                  <div className="relative">
                    <Layers3
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-primary"
                    />

                    <select
                      value={formData.type}
                      name="event-type"
                      onChange={(e) => updateField("type", e.target.value)}
                      className={`${eventInputClass} h-14.5 appearance-none pl-11 pr-10`}
                    >
                      <option value="" disabled>
                        Select event type
                      </option>

                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>

                <div>
                  <FieldLabel label="Location" />

                  <div className="relative">
                    <MapPin
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    />

                    <input
                      type="text"
                      value={formData.location}
                      name="location"
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="e.g. Main Park, Dhaka"
                      className={`${eventInputClass} h-14.5 pl-11`}
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail image URL */}
              <div>
                <FieldLabel label="Thumbnail Image URL" />

                <div className="relative">
                  <ImageIcon
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                  />

                  <input
                    type="url"
                    value={formData.image}
                    name="image"
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="https://example.com/event-image.jpg"
                    className={`${eventInputClass} h-14.5 pl-11`}
                  />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Add a URL for your event&apos;s thumbnail image.
                </p>
              </div>

              {/* Event date */}
              <div>
                <FieldLabel label="Event Date" />

                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <CalendarDays
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    />

                    <input
                      type="date"
                      value={formData.date}
                      min={minDate}
                      name="date"
                      onChange={(e) => updateField("date", e.target.value)}
                      className={`${eventInputClass} h-14.5 pl-11 scheme-light dark:scheme-dark`}
                      required
                    />
                  </div>

                  <div className="flex min-h-22 items-center gap-3 rounded-xl  px-4 py-3">
                    <Info size={19} className="shrink-0 text-primary" />

                    <p className="text-xs leading-5 text-muted-foreground">
                      Please select a future date.
                      <br />
                      Past dates are not allowed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Created by */}
              <div>
                <FieldLabel label="Created by" required={false} />

                <div className="flex items-center justify-between rounded-xl  px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        currentUser?.image ?? "https://i.pravatar.cc/100?img=12"
                      }
                      alt={currentUser?.name}
                      className="h-10 w-10 rounded-full border-2 border-border object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        {currentUser?.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>

                  <LockKeyhole size={18} className="text-muted-foreground" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse justify-between gap-4 border-t border-border pt-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="h-13 rounded-xl border border-border px-6 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-13 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-86.25"
                >
                  <CalendarPlus size={19} />
                  {loading ? "Creating Event..." : "Create Event"}
                </button>
              </div>
            </form>
          </section>

          {/* RIGHT: LIVE EVENT PREVIEW */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-xl font-bold">Event Preview</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                See how your event will appear to the community.
              </p>

              {/* Preview image */}
              <div className="relative mt-4 h-47.5 overflow-hidden rounded-lg bg-muted">
                {formData.image && !imageError ? (
                  <img
                    src={formData.image}
                    alt="Event preview"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon size={40} />
                    <span className="text-xs">
                      {imageError
                        ? "Unable to load image"
                        : "Your event image will appear here"}
                    </span>
                  </div>
                )}

                <span className="absolute right-0 top-0 rounded-bl-xl bg-[#13b981] px-4 py-4 text-sm font-semibold text-white">
                  {formData.type || "Event Type"}
                </span>
              </div>

              {/* Preview details */}
              <div className="mt-4">
                <h3 className="wrap-break-word text-2xl font-bold leading-tight">
                  {formData.title || "Event Title Goes Here"}
                </h3>

                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="shrink-0 text-primary" />
                    <span className="wrap-break-word">
                      {formData.location || "Location goes here"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="shrink-0 text-primary" />
                    <span>{formData.date ? formattedDate : "Event Date"}</span>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-line wrap-break-word text-sm leading-6 text-muted-foreground">
                  {formData.description ||
                    "A short description about your event goes here. Inspire people to get involved and make a difference!"}
                </p>
              </div>

              {/* Organizer */}
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      currentUser?.image ?? "https://i.pravatar.cc/100?img=12"
                    }
                    alt={currentUser?.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-[11px] text-muted-foreground">
                      Organized by
                    </p>
                    <p className="mt-0.5 text-sm font-semibold">
                      {currentUser?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative illustration */}
            <div className="hidden h-75 items-center justify-center lg:flex relative">
              <img
                src="/images/Community botanical.svg"
                alt="leaf"
                className="h-full w-full object-fit absolute top-15"
              />
            </div>
          </aside>
        </div>
      </main>
      <FooterMain />
    </>
  );
}

/* Reusable field label */
function FieldLabel({
  label,
  required = true,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="mb-3 block text-base font-semibold text-foreground">
      {label}
      {required && <span className="ml-1 text-primary">*</span>}
    </label>
  );
}
