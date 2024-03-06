import { NextResponse } from "next/server";
import { FortyTwoUser } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PoolDate, monthNames } from "@/types/date.interface";

async function getCampusUsers(campusId: number): Promise<FortyTwoUser[]> {
  try {
    const users = await prisma.fortyTwoUser.findMany({
      where: {
        campus_id: campusId,
      },
      orderBy: {
        level: "desc",
      },
    });
    if (!users || users.length === 0) {
      return [];
    }
    return users;
  } catch (error) {
    return [];
  }
}

async function getPoolDates(users: FortyTwoUser[]): Promise<PoolDate[]> {
  const poolDates = users.reduce((dates: PoolDate[], user) => {
    if (user.pool_month && user.pool_year) {
      const date: PoolDate = { month: user.pool_month, year: user.pool_year };
      const dateExists = dates.some((d) => d.month === date.month && d.year === date.year);
      if (!dateExists) dates.push(date);
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

export async function GET(req: Request) {
  const url = new URL(req.url);

  const campusId = Number(url.searchParams.get("campus_id"));
  if (!campusId) {
    return NextResponse.json({ message: "campus_id cannot be empty." }, { status: 400 });
  }

  const users = await getCampusUsers(campusId);
  const poolDates = await getPoolDates(users);

  return NextResponse.json(poolDates, { status: 200 });
}
