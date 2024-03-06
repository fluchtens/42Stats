"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getMyCampusId(): Promise<number> {
  try {
    const session = await auth();
    if (!session?.user || !session.user.email) {
      return 0;
    }

    const user = await prisma.fortyTwoUser.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return 0;
    }

    return user.campus_id;
  } catch (error) {
    return 0;
  }
}
