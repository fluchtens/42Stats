import prisma from "@/libs/prisma";
import { Campus } from "@prisma/client";

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

// export aysnc function getCampusUsers(campusId: number): Promise<User[] | null> {
//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         campus_id: campusId,
//       },
//       orderBy: {
//         last_name: "asc",
//       },
//     });
//     if (!users) {
//       return null;
//     }
//     return users;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
