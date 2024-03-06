import { NextResponse } from "next/server";
import { Campus, User } from "@prisma/client";
import prisma from "@/lib/prisma";

async function getCampuses(): Promise<Campus[]> {
  try {
    const campuses = await prisma.campus.findMany({
      orderBy: {
        id: "asc",
      },
    });
    if (!campuses) {
      return [];
    }
    return campuses;
  } catch (error) {
    return [];
  }
}

export async function GET(req: Request) {
  const campuses = await getCampuses();
  return NextResponse.json(campuses, { status: 200 });
}
