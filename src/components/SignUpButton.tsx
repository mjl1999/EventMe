"use client";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { signupToEvent } from "@/app/actions/signupToEvent";

export default function SignUpButton({ eventId, alreadySignedUp }: { eventId: string, alreadySignedUp: boolean }) {
  const [signedUp, setSignedUp] = useState(alreadySignedUp);
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="lg"
      className={`w-full sm:w-fit ${signedUp ? "bg-purple-600 text-white cursor-not-allowed" : ""}`}
      disabled={signedUp || isPending}
      onClick={() => {
        if (signedUp) return;
        startTransition(async () => {
          const result = await signupToEvent(eventId);
          if (result === "signed-up" || result === "already-signed-up") setSignedUp(true);
        });
      }}
    >
      {signedUp ? "Signed Up" : isPending ? "Signing Up..." : "Sign Up To Event"}
    </Button>
  );
}