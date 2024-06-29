"use client";

import { CampusUsersCountChart } from "@/components/stats/CampusUsersCountChart";

export default function Stats() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-4">
        <h1 className="text-base md:text-xl font-base">Statistics about all 42 campuses.</h1>
        <CampusUsersCountChart />
      </div>
    </main>
  );
}
