import { NextResponse } from "next/server";
import { FortyTwoUser } from "@prisma/client";
import prisma from "@/lib/prisma";

async function getTotalCampusUsers(campusId: number): Promise<FortyTwoUser[]> {
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

export async function GET(req: Request) {
  const url = new URL(req.url);

  const campusId = Number(url.searchParams.get("campus_id"));
  if (!campusId) {
    return NextResponse.json({ message: "campus_id cannot be empty." }, { status: 400 });
  }

  const users = await getTotalCampusUsers(campusId);
  return NextResponse.json(users, { status: 200 });
}
