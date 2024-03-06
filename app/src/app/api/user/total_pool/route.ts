import { NextResponse } from "next/server";
import { FortyTwoUser } from "@prisma/client";
import prisma from "@/lib/prisma";

async function getTotalPoolUsers(
  campusId: number,
  month: string,
  year: string
): Promise<FortyTwoUser[]> {
  try {
    const users = await prisma.fortyTwoUser.findMany({
      where: {
        campus_id: campusId,
        pool_month: month,
        pool_year: year,
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

export async function GET(req: Request) {
  const url = new URL(req.url);

  const campusId = Number(url.searchParams.get("campus_id"));
  if (!campusId) {
    return NextResponse.json({ message: "campus_id cannot be empty." }, { status: 400 });
  }

  const poolMonth = url.searchParams.get("pool_month");
  if (!poolMonth) {
    return NextResponse.json({ message: "pool_month cannot be empty." }, { status: 400 });
  }

  const poolYear = url.searchParams.get("pool_year");
  if (!poolYear) {
    return NextResponse.json({ message: "pool_year cannot be empty." }, { status: 400 });
  }

  const users = await getTotalPoolUsers(campusId, poolMonth, poolYear);
  return NextResponse.json(users, { status: 200 });
}
