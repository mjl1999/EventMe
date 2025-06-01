"use server";

import { prisma } from "@/db/db";
import { getCurrentUser } from "@/db/getCurrentUser";

export async function deleteEvent(eventId: string) {
  const user = await getCurrentUser();
  if (!user?.isStaff) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new Error("Event not found");
  if (event.isSeeded) throw new Error("Cannot delete seeded event");

  await prisma.event.delete({ where: { id: eventId } });
  return true;
}