import { Campus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCampus(): Promise<Campus[] | null> {
  try {
    const campus = await prisma.campus.findMany();
    if (!campus) {
      throw new Error("Unable to retrieve campus list");
    }

    campus.sort((a, b) => a.country.localeCompare(b.country));
    campus.sort((a, b) => {
      if (a.country === b.country) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    console.log(campus);
    return campus;
  } catch (error) {
    console.error("getAllCampus()", error);
    return null;
  }
}
