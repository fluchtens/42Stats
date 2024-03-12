"use server";

import { CampusesAvgLevelsChart } from "@/components/stats/CampusesAvgLevelsChart";
import { auth } from "@/lib/auth";
import { getCampusesAvgLevels } from "@/services/getCampusesAvgLevels";
import { getCampusesNames } from "@/services/getCampusesNames";
import { redirect } from "next/navigation";

export default async function Stats() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const campusesNames = await getCampusesNames();
  const campusesAvgLevels = await getCampusesAvgLevels();

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-1">
        <h1>Statistics about all 42 campuses.</h1>
        <CampusesAvgLevelsChart campusesNames={campusesNames} campusesLevels={campusesAvgLevels} />
      </div>
    </main>
  );
}
