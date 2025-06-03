import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { prisma } from "@/db/db";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, last_name, username } = evt.data;
      try {
        const newUser = await prisma.user.upsert({
          where: { id },
          update: {},
          create: {
            id,
            username: username || "",
            email: email_addresses[0]?.email_address || "",
            firstName: first_name || null,
            lastName: last_name || null,
          },
        });
        return new Response(JSON.stringify(newUser), { status: 200 });
      } catch (err) {
        // Optionally log err.message only
        return new Response("Error creating user", { status: 500 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
