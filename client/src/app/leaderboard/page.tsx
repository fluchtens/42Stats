"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { UserLeaderboard } from "./UserLeaderboard";

export default function Leaderboard() {
  const { user } = useAuth();

  if (user === null) {
    redirect("/");
  }

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex gap-4">
        <UserLeaderboard />
      </div>
    </main>
  );
}
