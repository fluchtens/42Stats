import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/libs/prisma";

async function getPoolUsers(month: string, year: string): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      where: {
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

  const poolMonth = url.searchParams.get("pool_month");
  if (!poolMonth) {
    return NextResponse.json({ message: "pool_month cannot be empty." }, { status: 400 });
  }

  const poolYear = url.searchParams.get("pool_year");
  if (!poolYear) {
    return NextResponse.json({ message: "pool_year cannot be empty." }, { status: 400 });
  }

  const users = await getPoolUsers(poolMonth, poolYear);
  return NextResponse.json(users, { status: 200 });
}
