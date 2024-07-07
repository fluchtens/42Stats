"use client";

import { getCampuses } from "@/services/campus.service";
import { Campus } from "@/types/campus.interface";
import { useEffect, useState } from "react";
import { HorizontalBarChart } from "../../HorizontalBarChart";

export const StudentCountChart = () => {
  const [names, setNames] = useState<string[]>([]);
  const [studentsCounts, setStudentsCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      const campuses = await getCampuses();
      if (!campuses || campuses.length === 0) return;

      campuses.sort((a: Campus, b: Campus) => b.studentCount - a.studentCount);
      setNames(campuses.map((campus: Campus, index) => `${index + 1}. ${campus.name} (${campus.country})`));
      setStudentsCounts(campuses.map((campus: Campus) => campus.studentCount));
    };

    fetchCampuses();
  }, []);

  return <HorizontalBarChart title="Number of student per campus" label="Students" labels={names} datas={studentsCounts} />;
};
