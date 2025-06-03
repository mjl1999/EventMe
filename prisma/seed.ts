import { PrismaClient } from "@prisma/client";
import { eventsInfo } from "../src/db/events-info";
const prisma = new PrismaClient();

async function main() {
  for (const event of eventsInfo) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        isSeeded: true,
        title: event.title,
        category: event.category,
        organiser: event.author,
        description: event.body,
        createdAt: event.createdAt,
        date: event.date,
        location: event.location,
        capacity: event.capacity,
        eventImageUrl: event.eventImageUrl,
      },
      create: {
        title: event.title,
        slug: event.slug,
        category: event.category,
        organiser: event.author,
        description: event.body,
        createdAt: event.createdAt,
        date: event.date,
        location: event.location,
        capacity: event.capacity,
        eventImageUrl: event.eventImageUrl,
        isSeeded: true, // Mark as seeded
      },
    });
  }
  // console.log("Seeded all events!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
