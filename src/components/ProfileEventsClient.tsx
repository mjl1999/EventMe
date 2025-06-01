"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { removeSignup } from "@/app/actions/removeSignup"; // Adjust the import based on your project structure

const CATEGORIES = ["all", "cooking", "coding", "football"];

export default function ProfileEventsClient({ events }: { events: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const [removed, setRemoved] = useState<{ [id: string]: boolean }>({});
  const [pending, setPending] = useState<{ [id: string]: boolean }>({});

  return (
    <main className="px-6 py-8">
      <div className="flex gap-2 justify-center mb-8">
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
      <h1 className="text-3xl font-bold mb-12 text-center">
        {selectedCategory === "all"
          ? "Your Events"
          : `Your ${
              selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            } Events`}
      </h1>
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <p className="text-center text-gray-500 text-2xl mb-12">
            {selectedCategory === "all"
              ? "You have not signed up for any events."
              : "You have not signed up for any events in this category."}
          </p>
          <Button asChild size="lg">
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event) => (
            <div
              key={event.slug}
              className="flex flex-col justify-between bg-white rounded-2xl shadow p-6 hover:shadow-lg transition duration-200"
            >
              <div className="relative w-full h-48 mb-4">
                <img
                  src={event.eventImageUrl ?? ""}
                  alt={event.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
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
              <p className="text-gray-700 mb-2">
                {event.description.length > 100
                  ? event.description.slice(0, 100) + "..."
                  : event.description}
              </p>
              {event.capacity !== undefined && (
                <p className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mt-2 w-fit">
                  Capacity: {event.capacity}
                </p>
              )}
              <div className="flex flex-row gap-4 mt-6">
                <Button size="lg" asChild className="button px-4">
                  <Link
                    href={`/events/${encodeURIComponent(event.slug)}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    See more
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="button px-4 transition duration-150 ease-in-out hover:scale-105 active:scale-95 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-400"
                  onClick={async () => {
                    await removeSignup(event.id);
                    // Optionally: refresh the page or remove the event from the UI here
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
