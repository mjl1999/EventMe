import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect, notFound } from "next/navigation";
import {prisma} from "@/db/db";
import UpdateEventFormWrapper from "@/components/UpdateEventWrapper";

export default async function UpdateEventPage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();

  if (!user || !user.isStaff) {
    redirect("/");
  }

  const { slug } = params;
  const event = await prisma.event.findUnique({
      where: { slug },
    });

  if (!event) {
    notFound();
  }

  return (
    <main className="max-w-md w-full mx-auto space-y-6 p-8">
      <h1 className="text-2xl font-semibold">Update Event (Admin only)</h1>
      <UpdateEventFormWrapper event={event} />
    </main>
  );
}