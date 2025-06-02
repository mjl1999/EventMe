import { Button } from "@/components/ui/button";
import SignUpButton from "@/components/SignUpButton";
import { CalendarRange, Users, User, Tag, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/db/db";
import EventImage from "@/components/EventImage";
import DeleteEvent from "@/components/DeleteEvent";



export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/prompt-signup");
  }

  // Fetch the event by slug
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  // If event not found, show 404
  if (!event) {
    notFound();
  }

  const alreadySignedUp = await prisma.signup.findFirst({
    where: { userId: user.id, eventId: event.id },
  });

  // Format date as dd/mm/yyyy
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  function addOneHour(date: Date) {
    const d = new Date(date);
    d.setHours(d.getHours() + 1);
    return d;
  }
  function formatGoogleDate(date: Date) {
    // Converts a JS Date to YYYYMMDDTHHmmssZ (UTC)
    const d = new Date(date);
    return (
      d
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z")
        .slice(0, 15) + "Z"
    );
  }
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${formatGoogleDate(event.date)}/${formatGoogleDate(
    addOneHour(event.date)
  )}&details=${encodeURIComponent(
    event.description
  )}&location=${encodeURIComponent(event.location)}`;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8">
        {/* Event Image */}
        <div className="w-full h-64 relative rounded-xl overflow-hidden mb-4">
          <EventImage
            src={event.eventImageUrl ?? undefined}
            alt={event.title}
          />
        </div>

        {/* Title & Meta */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-500 text-sm items-center">
            <span className="flex items-center gap-1">
              <User className="size-4" /> {event.organiser}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="size-4" /> {event.category}
            </span>
            <span className="flex items-center gap-1">
              <CalendarRange className="size-4" /> {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-4" /> Capacity:{" "}
              {event.capacity ?? "Unlimited"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4" /> {event.location}
            </span>
            <span className="flex items-center gap-1">
              Created: {formatDate(event.createdAt)}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">About this event</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <SignUpButton
            eventId={event.id}
            alreadySignedUp={!!alreadySignedUp}
          />
          <Button
            size="lg"
            asChild
            variant="outline"
            className="w-full sm:w-fit"
          >
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Google Calendar
            </a>
          </Button>
          <Button size="lg" asChild variant="ghost" className="w-full sm:w-fit">
            <Link href="/events">Back to Events</Link>
          </Button>
          <DeleteEvent event={event} user={user} />
        </div>
      </div>
    </main>
  );
}
