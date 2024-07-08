"use client";

import { getCampusCount } from "@/services/campus.service";
import { getUsersAverageLevel, getUsersCount } from "@/services/user.service";
import { useEffect, useState } from "react";
import { StatsCard } from "../StatsCard";
import { AverageLevelsChart } from "./AverageLevelsChart";
import { StudentsCountsChart } from "./StudentsCountsChart";

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
      <h1 className="text-2xl md:text-3xl font-bold">Statistics about 42</h1>
      <p className="text-sm md:text-lg font-light text-muted-foreground">These statistics concern data from api.intra.42.fr</p>
      <div className="mt-4 grid md:grid-cols-3 gap-2 md:gap-4">
        <StatsCard title="Campuses" desc="Number of campuses." value={campusesCount} />
        <StatsCard title="Students" desc="Number of students." value={usersCount} />
        <StatsCard title="Average level" desc="Average level of students." value={usersAverageLevel} />
      </div>
      <div className="mt-2 md:mt-4 grid gap-2 md:gap-4">
        <StudentsCountsChart />
        <AverageLevelsChart />
      </div>
    </section>
  );
};
