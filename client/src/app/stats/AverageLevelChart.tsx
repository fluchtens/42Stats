"use client";

import { getCampuses } from "@/services/campus.service";
import { Campus } from "@/types/campus.interface";
import { useEffect, useState } from "react";
import { HorizontalBarChart } from "./HorizontalBarChart";

export const AverageLevelChart = () => {
  const [names, setNames] = useState<string[]>([]);
  const [avgLevels, setAvgLevels] = useState<number[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      const campuses = await getCampuses();
      if (!campuses || campuses.length === 0) return;

      campuses.sort((a: Campus, b: Campus) => b.averageLevel - a.averageLevel);
      setNames(campuses.map((campus: Campus, index) => `${index + 1}. ${campus.name} (${campus.country})`));
      setAvgLevels(campuses.map((campus: Campus) => campus.averageLevel));
    };

    fetchCampuses();
  }, []);

  return <HorizontalBarChart title="Average level of students per campus" label="Average level" labels={names} datas={avgLevels} />;
};
