# src/ middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",

    // Define which routes are public and don't need authentication
    "/", // homepage
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/events/:id", // This will include routes like /events/1, /events/abc, etc.
    "/about",     // Another example of a public route
    "/contact",   // Another example of a public route
  ],
};

# navbar component

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AuthButtons from "./AuthButtons";

import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Link from "next/link";


export default function NavBar() {
  return (
    <header className="w-full border-b relative">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between relative">
        {/* Left - Logo */}
        <div className="flex-shrink-0 ml-2.5 z-10">EventMe</div>

       {/* Center - Nav */}
        <div className="hidden md:flex items-center">
          <NavItems />
        </div>

        {/* Mobile Nav trigger */}
        <div className="flex items-center md:hidden"> {/* <-- ADD THIS WRAPPER */}
          <MobileNav />
        </div>

        {/* Right - Auth / User */}
        <div className="flex-shrink-0 flex items-center gap-3 mr-2.5 z-10">
          <SignedOut>
            <AuthButtons />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}


# nav items component

import Link from "next/link";
import React from "react";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },{
    label: "Events",
    route: "/events",
  },
  {
    label: "Create Event",
    route: "/create-event",
  },
  {
    label: "Manage Events",
    route: "/manage-events",
  },
  {
    label: "MyEventMe",
    route: "/profile",
  },
];

const NavItems = ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => {
  const isMobile = variant === "mobile";

  const classNames = isMobile
    ? "flex flex-col items-start gap-4"
    : "hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 z-0";

  return (
    <ul className={classNames}>
      {headerLinks.map((link) => (
        <li
          key={link.route}
          className="text-gray-900 flex items-center justify-center p-medium-16 whitespace-nowrap"
        >
          <Link href={link.route}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;


# mobile nav component

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NavItems";
import { Separator} from "@/components/ui/separator";
const MobileNav = () => {
  return (
    <nav className="sm:hidden">
      <Sheet>
        <SheetTrigger className="text-sm font-medium text-black px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
  Menu
</SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white sm:hidden">
  <SheetHeader>
    <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
  </SheetHeader>

  <Separator className="border border-gray-50" />

  <NavItems variant="mobile" />
</SheetContent>

      </Sheet>
    </nav>
  );
};

export default MobileNav;


# auth buttons component

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
