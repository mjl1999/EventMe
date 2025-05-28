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
