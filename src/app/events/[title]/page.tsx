import { Button } from '@/components/ui/button'
import { CalendarRange } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getCurrentUser } from '@/db/getCurrentUser'
import { redirect } from 'next/navigation'

export default async function EventPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/prompt-signup");
  }
  
  return (
    <div>
      This is the event you selected
      <CalendarRange className='size-6'/>
      <Button size="lg" asChild className="button w-full sm:w-fit mx-auto">
            <Link href="#">Sign Up To Event</Link>
          </Button>
      <Button size="lg" asChild className="button w-full sm:w-fit mx-auto">
            <Link href="#">Add to google calender</Link>
          </Button>
    </div>
  )
}
