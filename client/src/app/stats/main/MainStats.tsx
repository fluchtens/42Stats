"use client";

import { StatsCard } from "../StatsCard";

export const MainStats = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold">Statistics about 42Stats</h1>
      <p className="text-lg font-light text-muted-foreground">These statistics concern only accounts registered on 42Stats</p>
      <div className="mt-4 grid md:grid-cols-2 gap-2 md:gap-4">
        <StatsCard title="Users" desc="Number of registered users." value="0" />
        <StatsCard title="Monthly active users" desc="Number of active users this month." value="0" />
      </div>
    </section>
  );
};
