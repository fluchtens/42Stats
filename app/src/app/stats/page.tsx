"use server";

import ChartComponent from "@/components/ChartComponent";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getAllCampusNames(): Promise<string[]> {
  const campuses = await prisma.fortyTwoCampus.findMany({
    select: {
      name: true,
    },
  });

  const campusNames = campuses.map((campus) => campus.name);
  return campusNames;
}

async function getAllCampusAvgLevels(): Promise<number[]> {
  const campuses = await prisma.fortyTwoCampus.findMany({
    select: {
      id: true,
    },
  });

  const avgLevels = [];

  for (let campus of campuses) {
    const res = await prisma.fortyTwoUser.aggregate({
      _avg: {
        level: true,
      },
      where: {
        campus_id: campus.id,
      },
    });

    avgLevels.push(parseFloat((res._avg.level ?? 0).toFixed(2)));
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

  const chartData = {
    labels: campusesNames,
    datasets: [
      {
        label: "Average level",
        data: campusesAvgLevels,
        backgroundColor: ["red"],
      },
    ],
  };

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center gap-1">
        <h1>Statistics about all 42 campuses.</h1>
      </div>
      <ChartComponent data={chartData} />
    </main>
  );
}
