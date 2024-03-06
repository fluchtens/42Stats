import { NextResponse } from "next/server";
import { FortyTwoCampus } from "@prisma/client";
import prisma from "@/lib/prisma";

async function getCampuses(): Promise<FortyTwoCampus[]> {
  try {
    const campuses = await prisma.fortyTwoCampus.findMany({
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
