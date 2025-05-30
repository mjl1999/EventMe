https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

npx create-next-app@latest .
npm install prisma --save-dev
npm install ts-node --save-dev

# set up shadcn

https://ui.shadcn.com/docs/installation/next

npx shadcn@latest init

npx shadcn@latest init
✔ Which color would you like to use as the base color? › Slate
✔ How would you like to proceed? › Use --force

npx shadcn@latest add button

add the button to your page.tsx

// in components folder but not in ui folder create a new file called NavBar.tsx and add the following code:

            export default function NavBar() {
            return (
                <div>
                NavBar
                </div>
            )
            }

// then add the NavBar component to your layout.tsx file like so:

            <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <NavBar/>
                    {children}
                </body>

# Clerk setup

https://clerk.com/docs/quickstarts/nextjs

npm install @clerk/nextjs

create a new file called middleware.ts in the src folder and add the following code:

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

wrap your app with the ClerkProvider in the layout.tsx file like so:

        <ClerkProvider>
            <html lang="en">
                <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                <NavBar />
                {children}
                </body>
            </html>
            </ClerkProvider>

Now go to your Clerk dashboard and create a new application.

Once you have created the application, create a .env file, and then go to the clerk settings tab and copy the API keys into it

Now further down you can see the code for sign in and sign out components.

You will want the following components

- Navbar.tsx
- MobileNav.tsx
- NavItems.tsx
- AuthButtons.tsx
  and you will want to install sheet and separator components from shadcn/ui

# setting up the prisma database

npx prisma init

create the database in postgres

fill out the database URL in the .env file like so

then fill out the schema.prisma file like so:

then run npx prisma generate (this will generate the prisma client)

go to db folder and in db.ts add the client like so:

    import { PrismaClient } from "@prisma/client";

    const globalForPrisma = global as unknown as { prisma: PrismaClient };

    export const prisma =
    globalForPrisma.prisma || new PrismaClient();

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

the above code will make sure that the prisma client is only created once in development mode, and reused in production mode. It will handle all client requests efficiently.

then run npx prisma db push (this will create the database tables)

then run npx prisma studio (this will open the prisma studio in your browser)

# Syncing user data from clerk into Database with webhooks

https://clerk.com/docs/webhooks/sync-data

# setting up the seed script
