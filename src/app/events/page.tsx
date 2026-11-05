import { redirect } from "next/navigation";

// Redirect /events to /events/upcomingevents
export default function EventsIndexPage() {
  redirect("/events/upcomingevents");
}
