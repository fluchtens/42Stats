"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getPoolUsersCount(
  campusId: number,
  month: string,
  year: string
): Promise<number> {
  try {
    const session = await auth();
    if (!session?.user) {
      return 0;
    }

    const userCount = await prisma.fortyTwoUser.count({
      where: {
        campus_id: campusId,
        pool_month: month,
        pool_year: year,
      },
    });
    return userCount;
  } catch (error) {
    return 0;
  }
}
