"use server";

import { FortyTwoUser } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PoolDate, monthNames } from "@/types/date.interface";
import { auth } from "@/lib/auth";

async function getCampusUsers(campusId: number): Promise<FortyTwoUser[] | null> {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    const users = await prisma.fortyTwoUser.findMany({
      where: {
        campus_id: campusId,
      },
      orderBy: {
        level: "desc",
      },
    });
    if (!users || users.length === 0) {
      return null;
    }
    return users;
  } catch (error) {
    return null;
  }
}

export async function getAvailablePoolDates(campusId: number): Promise<PoolDate[] | null> {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const users = await getCampusUsers(campusId);
  if (!users || users.length === 0) {
    return null;
  }

  const poolDates = users.reduce((dates: PoolDate[], user) => {
    if (user.pool_month && user.pool_year) {
      const date: PoolDate = { month: user.pool_month, year: user.pool_year };
      const dateExists = dates.some((d) => d.month === date.month && d.year === date.year);
      if (!dateExists) {
        dates.push(date);
      }
    }
    return dates;
  }, []);

  poolDates.sort((a, b) => {
    const yearA = Number(a.year);
    const yearB = Number(b.year);
    const monthA = monthNames.indexOf(a.month);
    const monthB = monthNames.indexOf(b.month);

    if (yearA !== yearB) {
      return yearA - yearB;
    } else {
      return monthA - monthB;
    }
  });

  return poolDates;
}
