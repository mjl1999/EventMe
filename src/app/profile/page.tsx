import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect } from "next/navigation";
import { prisma } from "@/db/db";
import ProfileEventsClient from "@/components/ProfileEventsClient";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/prompt-signup");
  }

  // Fetch events the user has signed up for
  const signups = await prisma.signup.findMany({
    where: { userId: user.id },
    include: { event: true },
  });

  // Extract the events
  const events = signups.map((signup) => signup.event);

  return <ProfileEventsClient events={events} />;
}