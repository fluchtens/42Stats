"use server";

import { FortyTwoUser } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getCampusUsers(
  campusId: number,
  page: number,
  pageSize: number
): Promise<FortyTwoUser[] | null> {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    if (pageSize > 100) {
      pageSize = 100;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const users = await prisma.fortyTwoUser.findMany({
      where: {
        campus_id: campusId,
      },
      orderBy: {
        level: "desc",
      },
      skip: skip,
      take: take,
    });
    if (!users || users.length === 0) {
      return null;
    }
    return users;
  } catch (error) {
    return null;
  }
}
