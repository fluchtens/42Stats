"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FortyTwoStatsTab } from "./forty-two/forty-two-stats-tab";
import { MainStatsTab } from "./main/main-stats.tab";

export const StatisticsTabs = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "42";

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.push(`?tab=${currentTab}`);
    }
  }, []);

  return (
    <div>
      {user === null && <NotAuthAlert />}
      {user && (
        <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4 w-full h-full grid grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="42">42</TabsTrigger>
            <TabsTrigger value="42stats">42Stats</TabsTrigger>
          </TabsList>
          <MainStatsTab />
          <FortyTwoStatsTab />
        </Tabs>
      )}
    </div>
  );
};
