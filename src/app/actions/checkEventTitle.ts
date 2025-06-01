"use server";

import { prisma } from "@/db/db";

export async function checkEventTitle(title: string, excludeId?: string) {
  const event = await prisma.event.findUnique({ where: {
      title,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    }, });
  return !!event;
}