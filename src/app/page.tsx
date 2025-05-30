import { Button } from "@/components/ui/button";
import { prisma } from "@/db/db";
import Image from "next/image";
import Link from "next/link";
import UserGreeting from "@/components/UserGreeting";

export default async function Home() {

  return (
    
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain min-h-screen flex items-center justify-center py-5 md:py-10">
        <div className="max-w-7xl w-full p-5 md:px-10 xl:px-0 flex flex-col items-center justify-center gap-8">
          <UserGreeting />
          <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px] text-center">
            Click, Connect, Community: Our Events, Your Experiences!
          </h1>
          <p className="font-normal tracking-[2%] text-[20px] leading-[30px] md:text-[24px] md:leading-[36px] text-center">
            Enjoy Some of the Best Events the Local Community Has to Offer!
          </p>
          <Button size="lg" asChild className="button w-full sm:w-fit mx-auto">
            <Link href="/events">Explore Events</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
