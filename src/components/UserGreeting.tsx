"use client";

import { useUser } from "@clerk/nextjs";

export default function UserGreeting() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return null;

  return <h2 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px] text-center">Hello {user?.username || user?.firstName || "User"}!</h2>;
}

