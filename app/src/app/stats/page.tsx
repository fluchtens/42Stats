"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getAllCampusNames() {
  const campuses = await prisma.fortyTwoCampus.findMany({
    select: {
      name: true,
    },
  });

  const campusNames = campuses.map((campus) => campus.name);
  return campusNames;
}

async function getAllCampusAvgLevels() {
  const campuses = await prisma.fortyTwoCampus.findMany({
    select: {
      id: true,
    },
  });

  const avgLevels = [];

  for (let campus of campuses) {
    const result = await prisma.fortyTwoUser.aggregate({
      _avg: {
        level: true,
      },
      where: {
        campus_id: campus.id,
      },
    });

    avgLevels.push(result._avg.level);
  }

  return avgLevels;
}

export default async function Stats() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const campusesNames = await getAllCampusNames();
  const campusesAvgLevels = await getAllCampusAvgLevels();

  const data = campusesNames.map((campus, index) => ({
    campus,
    averageLevel: campusesAvgLevels[index],
  }));

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center gap-1">
        <h1>Statistics about all 42 campuses.</h1>
      </div>
    </main>
  );
}
