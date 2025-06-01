"use client";

import dynamic from "next/dynamic";

// Dynamically import the actual client-side UpdateEventForm
const UpdateEventForm = dynamic(
  () => import("./UpdateEventForm").then((mod) => mod.UpdateEventForm),
  { ssr: false }
);

export default function UpdateEventFormWrapper({ event }: { event: any }) {
  return <UpdateEventForm event={event} />;
}