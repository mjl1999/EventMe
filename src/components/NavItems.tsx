import Link from "next/link";
import React from "react";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Events",
    route: "/events",
  },
  {
    label: "Create Event",
    route: "/events/create",
    adminOnly: true,
  },
  {
    label: "Manage Events",
    route: "/events/manage",
    adminOnly: true,
  },
  {
    label: "MyEvents",
    route: "/profile",
  },
];

const NavItems = ({
  variant = "desktop",
  isStaff = false,
}: {
  variant?: "desktop" | "mobile";
  isStaff?: boolean;
}) => {
  const isMobile = variant === "mobile";

  const classNames = isMobile
    ? "flex flex-col items-start gap-4"
    : "hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 z-0";

  return (
    <ul className={classNames}>
      {headerLinks
        .filter((link) => !link.adminOnly || isStaff)
        .map((link) => (
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