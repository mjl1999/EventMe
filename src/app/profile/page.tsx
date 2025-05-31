import { getCurrentUser } from "@/db/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/prompt-signup");
  }

  return (
    <div>
      Here are your specific events
    </div>
  );
}
