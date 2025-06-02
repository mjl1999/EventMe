
import { getCurrentUser } from "@/db/getCurrentUser";

export default async function UserGreeting() {
   const user = await getCurrentUser();

  if (!user) return null;

  const name =
    user?.firstName ||
    user?.username ||
    user?.email ||
    "User";

  return (
    <h2 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px] text-center">
      Hello, {name}!
    </h2>
  );
}

