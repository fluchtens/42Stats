import { PrismaClient, Campus } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCampuses(): Promise<Campus[] | null> {
  try {
    const campuses = await prisma.campus.findMany({
      orderBy: {
        id: "asc",
      },
    });
    if (!campuses) {
      return null;
    }
    return campuses;
  } catch (error) {
    console.error(error);
    return null;
  }
}
