"use server";

import { prisma } from "@/db/db";

export async function checkEventTitle(title: string) {
  const event = await prisma.event.findUnique({ where: { title } });
  return !!event;
}