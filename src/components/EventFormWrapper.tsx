"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual client-side EventForm
const EventForm = dynamic(() => import("./EventForm").then((mod) => mod.EventForm), {
  ssr: false,
});

export default function EventFormWrapper() {
  return <EventForm />;
}
