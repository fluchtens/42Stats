"use server";

import { FortyTwoCampus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getCampuses(): Promise<FortyTwoCampus[] | null> {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const campuses = await prisma.fortyTwoCampus.findMany({
      orderBy: {
        id: "asc",
      },
    });
    if (!campuses || campuses.length === 0) {
      return null;
    }
    return campuses;
  } catch (error) {
    return null;
  }
}
