import { NextResponse } from "next/server";
import { FortyTwoUser } from "@prisma/client";
import prisma from "@/lib/prisma";

async function getUserById(userId: number): Promise<FortyTwoUser | null> {
  try {
    const user = await prisma.fortyTwoUser.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const userId = Number(url.searchParams.get("user_id"));
  if (!userId) {
    return NextResponse.json({ message: "user_id cannot be empty." }, { status: 400 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
