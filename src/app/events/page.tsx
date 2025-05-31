import { prisma } from "@/db/db";
import EventsClient from "../../components/EventsClient";

export default async function EventsPage() {
  const events = await prisma.event.findMany();
  return <EventsClient events={events} />;
}