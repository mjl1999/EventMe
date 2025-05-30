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
import { Separator } from "@/components/ui/separator";

type MobileNavProps = {
  isStaff?: boolean;
};

const MobileNav = ({ isStaff }: MobileNavProps) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="text-sm font-medium text-black px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
          Menu
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white sm:hidden">
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          </SheetHeader>

          <Separator className="border border-gray-50" />

          <NavItems variant="mobile"  isStaff={isStaff}/>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
