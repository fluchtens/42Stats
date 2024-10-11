"use client";

import { PageHeader } from "@/components/page-header";
import { TabsContent } from "@/components/ui/tabs";
import { getAccountsCount, getActiveAccountsCount } from "@/services/account.service";
import { useEffect, useState } from "react";
import { StatsCard } from "../../ui/stats-card";
import { MonthlyRegistrationsChart } from "./ui/monthly-registrations-chart";

export const MainStatsTab = () => {
  const [userCout, setUserCount] = useState<number>(0);
  const [activeUserCount, setActiveUserCount] = useState<number>(0);

  const fetchData = async () => {
    const fetchedAccountsCount = await getAccountsCount();
    if (fetchedAccountsCount) {
      setUserCount(fetchedAccountsCount);
    }

    const fetchedActiveAccountsCount = await getActiveAccountsCount();
    if (fetchedActiveAccountsCount) {
      setActiveUserCount(fetchedActiveAccountsCount);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TabsContent value="42stats">
      <PageHeader title="Statistics about 42Stats" description="These statistics concern only accounts registered on 42Stats" />
      <div className="mt-4 grid md:grid-cols-2 gap-2 md:gap-4">
        <StatsCard title="Users" desc="Number of registered users." value={userCout} />
        <StatsCard title="Monthly active users" desc="Number of active users this month." value={activeUserCount} />
      </div>
      <div className="mt-2 md:mt-4 grid gap-2 md:gap-4">
        <MonthlyRegistrationsChart />
      </div>
    </TabsContent>
  );
};
