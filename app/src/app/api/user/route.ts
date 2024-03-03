import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/libs/prisma";

async function getUserById(userId: number): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
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
    return NextResponse.json(
      { message: "user_id cannot be empty." },
      { status: 400 }
    );
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
