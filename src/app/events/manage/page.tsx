import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function ManageEvent() {
  const user = await getCurrentUser();

  if (!user || !user.isStaff) {
    redirect("/");
  }

  return (
    <div>
      Select and update events
    </div>
  );
}
