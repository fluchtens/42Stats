import prisma from "@/libs/prisma";
import { User } from "@prisma/client";

export async function getUserById(userId: number): Promise<User | null> {
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
    console.error(error);
    return null;
  }
}

export async function getUserByLogin(login: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllUsers(): Promise<User[] | null> {
  try {
    const users = await prisma.user.findMany({
      take: 100,
      orderBy: {
        level: "desc",
      },
    });
    if (!users) {
      return null;
    }
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}
