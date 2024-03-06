"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCampusUsersCount(campusId: number): Promise<number> {
  try {
    const session = await auth();
    if (!session?.user) {
      return 0;
    }

    const userCount = await prisma.fortyTwoUser.count({
      where: {
        campus_id: campusId,
      },
    });
    return userCount;
  } catch (error) {
    return 0;
  }
}
