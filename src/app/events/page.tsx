import { prisma } from "@/db/db";
import EventsClient from "../../components/EventsClient";
import { getCurrentUser } from "@/db/getCurrentUser";



export default async function EventsPage() {
  const events = await prisma.event.findMany();
  const user = await getCurrentUser();
  
  
  return <EventsClient events={events} user={user ? { isStaff: user.isStaff } : undefined}/>;
}