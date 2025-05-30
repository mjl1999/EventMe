import { eventsInfo } from "@/db/events-info";
import Image from "next/image";

export default function EventsPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsInfo.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition duration-200"
          >
            <div className="relative w-full h-48 mb-4">
              <img
  src={event.article_img_url}
  alt={event.title}
  className="w-full h-48 object-cover mb-4 rounded"
/>
            </div>

            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-500">By {event.author} · {event.topic}</p>
            <p className="text-sm text-gray-400 mb-2">
              {new Date(event.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              {event.body.length > 100 ? event.body.slice(0, 100) + "..." : event.body}
            </p>
            {event.votes !== undefined && (
              <p className="text-sm text-blue-500 mt-2">👍 {event.votes} votes</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
