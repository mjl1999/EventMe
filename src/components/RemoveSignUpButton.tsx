"use client";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { removeSignup } from "@/app/actions/removeSignup";

export default function RemoveSignupButton({ eventId }: { eventId: string }) {
  const [isPending, startTransition] = useTransition();
  const [removed, setRemoved] = useState(false);

  return (
    <Button
      variant={removed ? "default" : "destructive"} // Change variant dynamically
      size="lg"
      className="mt-6 button w-full sm:w-fit mx-auto"
      disabled={isPending || removed} // Disable button when removing or removed
      onClick={() => {
        if (isPending || removed) return;
        startTransition(async () => {
          await removeSignup(eventId);
          setRemoved(true);
        });
      }}
    >
      {removed
        ? "Removed" // Text when removed
        : isPending
        ? "Removing..." // Text when removing
        : "Remove from My Events"}
    </Button>
  );
}