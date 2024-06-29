"use server";

import { UserLeaderboards } from "@/components/leaderboard/UserLeaderboards";

export default async function Leaderboard() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex gap-4">
        <UserLeaderboards />
      </div>
    </main>
  );
}
