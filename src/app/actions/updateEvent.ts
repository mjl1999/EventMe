// app/actions/updateEvent.ts

"use server";

import { prisma } from "@/db/db";

export async function updateEvent(
  eventId: string,
  data: {
    title: string;
    description: string;
    location: string;
    date: string;
    category: "cooking" | "coding" | "football";
    organiser: string;
    capacity?: number;
    eventImageUrl?: string;
    slug: string;
  }
) {
  return prisma.event.update({
    where: { id: eventId },
    data: {
      ...data,
      date: new Date(data.date), // ensure date is a Date object
    },
  });
}
