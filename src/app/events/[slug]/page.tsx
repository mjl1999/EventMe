import { Button } from "@/components/ui/button";
import { CalendarRange, Users, User, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/db/db";

export default async function EventPage(props: { params: { slug: string } }) {
  const { slug } = await props.params;
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

  // Format date as dd/mm/yyyy
  const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8">
        {/* Event Image */}
        {event.eventImageUrl && (
          <div className="w-full h-64 relative rounded-xl overflow-hidden mb-4">
            <img
              src={event.eventImageUrl}
              alt={event.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

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
              <Users className="size-4" /> Capacity: {event.capacity ?? "Unlimited"}
            </span>
            <span className="flex items-center gap-1">
              Created: {formatDate(event.createdAt)}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">About this event</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button size="lg" asChild className="w-full sm:w-fit">
            <Link href="#">Sign Up To Event</Link>
          </Button>
          <Button size="lg" asChild variant="outline" className="w-full sm:w-fit">
            <Link href="#">Add to Google Calendar</Link>
          </Button>
          <Button size="lg" asChild variant="ghost" className="w-full sm:w-fit">
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}