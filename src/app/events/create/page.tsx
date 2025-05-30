import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect } from "next/navigation";

export default async function CreateEventPage() {
  const user = await getCurrentUser();

  if (!user || !user.isStaff) {
    redirect("/"); // or to /unauthorized
  }

  return (
    <main>
      <h1>Create Event (Admin only)</h1>
      {/* Your create event form */}
    </main>
  );
}
