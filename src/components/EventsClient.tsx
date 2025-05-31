"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CATEGORIES = ["all", "cooking", "coding", "football"];

export default function EventsClient({ events }: { events: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <main className="px-6 py-8">
      {/* Category Selector */}
      <div className="flex gap-2 justify-center mb-6">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>
      {/* Dynamic Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        {selectedCategory === "all"
          ? "All Events"
          : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Events`}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.slug}
            className="flex flex-col justify-between bg-white rounded-2xl shadow p-4 hover:shadow-lg transition duration-200"
          >
            <div className="relative w-full h-48 mb-4">
              <img
                src={event.eventImageUrl ?? ""}
                alt={event.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-500">
              By {event.organiser} · {event.category}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              {(() => {
    const d = new Date(event.createdAt);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  })()}
            </p>
            <p className="text-gray-700">
              {event.description.length > 100
                ? event.description.slice(0, 100) + "..."
                : event.description}
            </p>
            {event.capacity !== undefined && (
              <p className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mt-2 w-fit">
                Capacity: {event.capacity}
              </p>
            )}
            <Button
              size="lg"
              asChild
              className="mt-4 button w-full sm:w-fit mx-auto"
            >
              <Link
                href={`/events/${encodeURIComponent(event.slug)}`}
                className="text-blue-600 hover:underline text-sm"
              >
                See more
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}