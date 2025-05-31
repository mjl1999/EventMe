"use server";
import { prisma } from "@/db/db";
import { getCurrentUser } from "@/db/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function removeSignup(eventId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  await prisma.signup.deleteMany({
    where: { userId: user.id, eventId },
  });

  // Revalidate the profile page so UI updates
  revalidatePath("/profile");
  return "removed";
}