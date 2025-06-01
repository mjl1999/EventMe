"use server";

import { prisma } from "@/db/db";

export async function createEvent(data: {
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  category: string;
  organiser: string;
  capacity?: number;
  eventImageUrl?: string;
}) {
  try {
    const event = await prisma.event.create({
      data: {
        ...data,
        date: new Date(data.date), // Convert string to Date
      },
    });
    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}