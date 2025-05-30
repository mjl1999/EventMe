import { auth  } from "@clerk/nextjs/server";
import {prisma} from "./db";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) return null;

  return user;
}
