"use server";

import { UserLeaderboard } from "./user-leaderboard";

export default async function Leaderboard() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex gap-4">
        <UserLeaderboard />
      </div>
    </main>
  );
}
