"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCampusesNames(): Promise<string[]> {
  try {
    const session = await auth();
    if (!session?.user) {
      return [];
    }

    const campuses = await prisma.fortyTwoCampus.findMany({
      select: {
        name: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const campusNames = campuses.map((campus) => campus.name);
    return campusNames;
  } catch (error) {
    return [];
  }
}
