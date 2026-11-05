"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type EventDetails = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  type: string;
  image: string;
  joined?: number;
  name?: string;
};

type Props = {
  event: EventDetails;
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function JoinEventButton({ event }: Props) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isJoined, setIsJoined] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = session?.user;
  const userEmail = user?.email;
  const checkKey = userEmail ? `${event.id}:${userEmail}` : null;
  const [checkedKey, setCheckedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !userEmail || !checkKey) return;

    const email = userEmail;
    const key = checkKey;
    const controller = new AbortController();

    async function checkRegistration() {
      try {
        const params = new URLSearchParams({
          eventId: event.id,
          userEmail: email,
        });

        const res = await fetch(
          `${API_URL}/join-event/status?${params.toString()}`,
          { cache: "no-store", signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Could not check registration status.");
        }

        const data = await res.json();
        if (!controller.signal.aborted) setIsJoined(data.joined === true);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          toast.error("Could not check your registration status.");
        }
      } finally {
        if (!controller.signal.aborted) setCheckedKey(key);
      }
    }

    void checkRegistration();
    return () => controller.abort();
  }, [checkKey, event.id, isPending, userEmail]);

  const handleJoinLeave = async () => {
    if (isPending || isSubmitting) return;

    if (!user?.email) {
      toast.error("Please log in to join this event.");

      router.push(
        `/login?callbackURL=${encodeURIComponent(`/events/${event.id}`)}`,
      );

      return;
    }

    let token: string | undefined;
    try {
      const { data: jwtData } = await authClient.token();
      token = jwtData?.token;
    } catch (err) {
      console.error("Failed to retrieve auth token:", err);
    }

    setIsSubmitting(true);

    try {
      const leaving = isJoined;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/join-event`, {
        method: leaving ? "DELETE" : "POST",
        headers,
        body: JSON.stringify(
          leaving
            ? {
                eventId: event.id,
                userEmail: user.email,
              }
            : {
                eventId: event.id,
                title: event.title,
                description: event.description,
                date: event.date,
                time: event.time ?? null,
                location: event.location,
                type: event.type,
                image: event.image,
                joined: true,
                organizer: event.name ?? null,
                name: user.name,
                email: user.email,
              },
        ),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message ??
            (leaving
              ? "Failed to leave the event."
              : "Failed to join the event."),
        );
      }

      setIsJoined(!leaving);

      toast.success(
        data.message ??
          (leaving
            ? "You have left the event."
            : "You have successfully joined the event."),
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isChecking = Boolean(userEmail && checkedKey !== checkKey);
  const isLoading = isPending || isChecking || isSubmitting;

  return (
    <Button
      type="button"
      onClick={handleJoinLeave}
      disabled={isLoading}
      variant={isJoined ? "outline" : "default"}
      className="mt-8 h-10 w-fit rounded-full px-6 text-sm font-semibold"
    >
      {isSubmitting
        ? "Please wait..."
        : isChecking || isPending
          ? "Checking..."
          : isJoined
            ? "Joined — Leave Event"
            : "Join Event"}
    </Button>
  );
}
