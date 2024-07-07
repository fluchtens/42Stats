"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { FortyTwoStats } from "./forty-two/FortyTwoStats";
import { MainStats } from "./main/MainStats";

export default function Stats() {
  const { user } = useAuth();

  if (user === null) {
    redirect("/");
  }

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex gap-10">
        <MainStats />
        <FortyTwoStats />
      </div>
    </main>
  );
}
