import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

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
