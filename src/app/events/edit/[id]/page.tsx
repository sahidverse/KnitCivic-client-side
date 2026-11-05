"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Layers3,
  Image as ImageIcon,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";
import HeroPage from "@/components/events/HeroPage";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;

  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    image: "",
    date: "",
  });

  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing event data when the page loads
  useEffect(() => {
    if (!eventId) return;

    const controller = new AbortController();

    async function fetchEventDetails() {
      try {
        setIsLoadingEvent(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/single/${eventId}`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Could not find event details.");
        }

        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          type: data.type || "",
          location: data.location || "",
          image: data.image || "",
          date: data.date ? data.date.split("T")[0] : "",
        });
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          toast.error("Failed to load event for editing.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingEvent(false);
        }
      }
    }

    void fetchEventDetails();
    return () => controller.abort();
  }, [eventId]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser?.email) {
      toast.error("Please sign in to edit this event.");
      return;
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

    try {
      setIsSubmitting(true);

      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            ...formData,
            updatedAt: new Date().toISOString(),
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");
      router.push("/events/manage-event");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update event.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
      <HeroPage
        title="Edit"
        highlight="Event"
        badge="Update Details"
        description="Make updates to your event details, location, and schedule."
      />

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-6">
          <Link
            href="/events/manage-event"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Manage Events
          </Link>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight">Edit Event</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update the information below to keep your participants informed.
          </p>

          {isLoadingEvent ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="mt-3 text-sm">Loading event data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Event Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Event Title <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. Tree Plantation Drive"
                  className={`${eventInputClass} h-12 px-4`}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description <span className="text-primary">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Explain the purpose of this event..."
                  className={`${eventInputClass} min-h-36 resize-y p-4`}
                  required
                />
              </div>

              {/* Type & Location */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Event Type <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Layers3 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                    <select
                      value={formData.type}
                      onChange={(e) => updateField("type", e.target.value)}
                      className={`${eventInputClass} h-12 pl-10 pr-4`}
                      required
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Location <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="e.g. Central Park"
                      className={`${eventInputClass} h-12 pl-10`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Thumbnail Image URL <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <ImageIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`${eventInputClass} h-12 pl-10`}
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Event Date <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={`${eventInputClass} h-12 pl-10 scheme-light dark:scheme-dark`}
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse justify-end gap-3 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="h-11 rounded-xl border border-border px-5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
