"use client";

import { getAccountsCount, getActiveAccountsCount } from "@/services/account.service";
import { useEffect, useState } from "react";
import { StatsCard } from "../StatsCard";

export const MainStats = () => {
  const [userCout, setUserCount] = useState<number | null>(null);
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);

  const fetchData = async () => {
    const fetchedAccountsCount = await getAccountsCount();
    setUserCount(fetchedAccountsCount);

    const fetchedActiveAccountsCount = await getActiveAccountsCount();
    setActiveUserCount(fetchedActiveAccountsCount);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-bold">Statistics about 42Stats</h1>
      <p className="text-sm md:text-lg font-light text-muted-foreground">These statistics concern only accounts registered on 42Stats</p>
      <div className="mt-4 grid md:grid-cols-2 gap-2 md:gap-4">
        <StatsCard title="Users" desc="Number of registered users." value={userCout} />
        <StatsCard title="Monthly active users" desc="Number of active users this month." value={activeUserCount} />
      </div>
    </section>
  );
};
