"use client";

import { StatsCharts } from "./StatsCharts";

export default function Stats() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-4">
        <StatsCharts />
      </div>
    </main>
  );
}
