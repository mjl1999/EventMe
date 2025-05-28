

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
