import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect } from "next/navigation";
import EventFormWrapper from "@/components/EventFormWrapper";

export default async function CreateEventPage() {
  const user = await getCurrentUser();

  if (!user || !user.isStaff) {
    redirect("/");
  }

  return (
    <main className="max-w-md w-full mx-auto space-y-6 p-8">
      <h1 className="text-2xl font-semibold">Create Event (Admin only)</h1>
      <EventFormWrapper />
    </main>
  );
}
