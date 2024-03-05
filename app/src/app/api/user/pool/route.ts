import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/libs/prisma";

async function getPoolUsers(
  campusId: number,
  month: string,
  year: string,
  skip: number,
  take: number
): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      where: {
        campus_id: campusId,
        pool_month: month,
        pool_year: year,
      },
      orderBy: {
        level: "desc",
      },
      skip: skip,
      take: take,
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

  const page = Number(url.searchParams.get("page")) || 1;
  let pageSize = Number(url.searchParams.get("page_size")) || 42;
  if (pageSize > 100) {
    pageSize = 100;
  }

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const users = await getPoolUsers(campusId, poolMonth, poolYear, skip, take);
  return NextResponse.json(users, { status: 200 });
}
