import { PrismaClient } from "@prisma/client";
import { eventsInfo } from "./events-info";
const prisma = new PrismaClient();


async function main() {
    for (const event of eventsInfo) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: {
        title: event.title,
        slug: event.slug,
        category: event.category,
        organiser: event.author,
        body: event.body,
        createdAt: event.createdAt, // or new Date(event.createdAt) if needed
        date: event.date,
        location: event.location,
        capacity: event.capacity,
        eventImageUrl: event.eventImageUrl,
      },
    });
  }
  console.log("Seeded all events!");
  
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