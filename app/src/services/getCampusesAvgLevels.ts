"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCampusesAvgLevels(): Promise<number[]> {
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

    const avgLevels = [];

    for (let campus of campuses) {
      const res = await prisma.fortyTwoUser.aggregate({
        _avg: {
          level: true,
        },
        where: {
          campus_id: campus.id,
        },
      });

      avgLevels.push(parseFloat((res._avg.level ?? 0).toFixed(2)));
    }

    return avgLevels;
  } catch (error) {
    return [];
  }
}
