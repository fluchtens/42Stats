"use client";

import { getCampuses } from "@/services/campus.service";
import { Campus } from "@/types/campus.interface";
import { useEffect, useState } from "react";
import { HorizontalBarChart } from "./HorizontalBarChart";

export const UserCountChart = () => {
  const [names, setNames] = useState<string[]>([]);
  const [campusesUsersCount, setCampusesUsersCount] = useState<number[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      const campuses = await getCampuses();
      if (!campuses || campuses.length === 0) return;

      campuses.sort((a: Campus, b: Campus) => b.userCount - a.userCount);
      setNames(campuses.map((campus: Campus, index) => `${index + 1}. ${campus.name} (${campus.country})`));
      setCampusesUsersCount(campuses.map((campus: Campus) => campus.userCount));
    };

    fetchCampuses();
  }, []);

  return <HorizontalBarChart title="Number of users per campus" label="Users" labels={names} datas={campusesUsersCount} />;
};
