import { Button } from '@/components/ui/button'
import { CalendarRange } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getCurrentUser } from '@/db/getCurrentUser'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/db/db'

export default async function EventPage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/prompt-signup");
  }

  // Fetch the event by slug
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  // If event not found, show 404
  if (!event) {
    notFound();
  }

  return (
    <div>
      This is the event you selected: {event.title}
      <CalendarRange className='size-6'/>
      <Button size="lg" asChild className="button w-full sm:w-fit mx-auto">
        <Link href="#">Sign Up To Event</Link>
      </Button>
      <Button size="lg" asChild className="button w-full sm:w-fit mx-auto">
        <Link href="#">Add to google calendar</Link>
      </Button>
    </div>
  )
}