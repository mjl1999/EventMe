"use client";

import { SignOutButton, SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";


export default function AuthButtons() {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div className="flex gap-2">
      <SignedOut>
        <Button
          onClick={() => openSignIn()}
          className="rounded-full bg-purple-600 hover:bg-purple-500" size="lg">
          Login
        </Button>
        <Button
          onClick={() => openSignUp()}
          className="rounded-full" size="lg"
        >
          Sign Up
        </Button>
      </SignedOut>

      <SignedIn>
        <UserButton/>
      </SignedIn>
    </div>
  );
}
