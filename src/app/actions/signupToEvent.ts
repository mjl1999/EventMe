"use server";
import { prisma } from "@/db/db";
import { getCurrentUser } from "@/db/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function signupToEvent(eventId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  // Check if already signed up
  const existing = await prisma.signup.findFirst({
    where: { userId: user.id, eventId },
  });
  if (existing) return "already-signed-up";

  await prisma.signup.create({
    data: {
      userId: user.id,
      eventId,
    },
  });

  // Revalidate the event page so UI updates
  revalidatePath(`/events/${eventId}`);
  return "signed-up";
}