import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PleaseSignInPage() {
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-contain min-h-screen flex items-center justify-center py-5 md:py-10">
      <div className="max-w-2xl w-full p-5 md:px-10 xl:px-0 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="font-bold text-[32px] leading-[42px] lg:text-[40px] lg:leading-[52px]">
          You must be signed in to view this page
        </h1>
        <p className="text-[18px] leading-[28px] text-gray-600">
          Please sign in or create an account to access this content.
        </p>
        <Button size="lg" asChild className="button w-full sm:w-fit mx-auto">
          <Link href="/">Return To Homepage</Link>
        </Button>
      </div>
    </section>
  );
}
