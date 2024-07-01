"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { StatsCharts } from "./StatsCharts";

export default function Stats() {
  const { user } = useAuth();

  if (user === null) {
    redirect("/");
  }

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-4">
        <StatsCharts />
      </div>
    </main>
  );
}
