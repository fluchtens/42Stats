"use server";

import { StatisticsTabs } from "./statistics-tabs";

export default async function Stats() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto">
        <StatisticsTabs />
      </div>
    </main>
  );
}
