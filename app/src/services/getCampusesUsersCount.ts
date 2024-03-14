"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCampusesUsersCount(): Promise<number[]> {
  try {
    const session = await auth();
    if (!session?.user) {
      return [];
    }

    const campuses = await prisma.fortyTwoCampus.findMany({
      select: {
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const usersCount = [];

    for (let campus of campuses) {
      const count = await prisma.fortyTwoUser.count({
        where: {
          campus_id: campus.id,
        },
      });

      usersCount.push(count);
    }

    return usersCount;
  } catch (error) {
    return [];
  }
}
