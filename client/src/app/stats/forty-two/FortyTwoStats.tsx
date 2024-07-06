"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCampusCount } from "@/services/campus.service";
import { getUsersAverageLevel, getUsersCount } from "@/services/user.service";
import { useEffect, useState } from "react";
import { StatsCard } from "../StatsCard";
import { FortyTwoCampusesRankingTabs } from "./FortyTwoCampusesRankingTabs";

export const FortyTwoStats = () => {
  const [campusesCount, setCampusesCount] = useState<number | null>(null);
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [usersAverageLevel, setUsersAverageLevel] = useState<string | null>(null);

  const fetchData = async () => {
    const fetchedCampusesCount = await getCampusCount();
    setCampusesCount(fetchedCampusesCount);

    const fetchedUsersCount = await getUsersCount();
    setUsersCount(fetchedUsersCount);

    const fetchedUsersAverageLevel = await getUsersAverageLevel();
    if (fetchedUsersAverageLevel) {
      setUsersAverageLevel(fetchedUsersAverageLevel.toFixed(2));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold">Statistics about 42</h1>
      <p className="text-lg font-light text-muted-foreground">These statistics concern data from api.intra.42.fr</p>
      <div className="mt-4 grid md:grid-cols-3 gap-2 md:gap-4">
        <StatsCard title="Campuses" desc="Number of 42 campuses." value={campusesCount} />
        <StatsCard title="Users" desc="Number of 42 users." value={usersCount} />
        <StatsCard title="Average level" desc="Average level of 42 users." value={usersAverageLevel} />
      </div>
      <Card className="mt-2 md:mt-4">
        <CardHeader className="pb-4">
          <CardTitle>Campuses ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <FortyTwoCampusesRankingTabs />
        </CardContent>
      </Card>
    </section>
  );
};
