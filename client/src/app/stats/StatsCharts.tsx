"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCampuses } from "@/services/campus.service";
import { Campus } from "@/types/campus.interface";
import { useEffect, useState } from "react";
import { AverageLevelChart } from "./AverageLevelChart";
import { StudentCountChart } from "./StudentCountChart";
import { UserCountChart } from "./UserCountChart";

export const StatsCharts = () => {
  const [campuses, setCampuses] = useState<Campus[] | null | undefined>(undefined);

  useEffect(() => {
    const fetchCampuses = async () => {
      const campuses = await getCampuses();
      setCampuses(campuses);
    };

    fetchCampuses();
  }, []);

  return (
    <>
      {campuses === null ||
        (campuses?.length === 0 && (
          <div className="text-center">
            <p className="text-lg font-normal text-destructive">Failed to fetch campuses...</p>
            <p className="text-sm font-normal text-muted-foreground">Please contact support to resolve this error.</p>
          </div>
        ))}
      {campuses && (
        <Tabs defaultValue="studentCount" className="w-full flex flex-col justify-center items-center">
          <TabsList className="h-full flex flex-col md:flex-row">
            <TabsTrigger value="studentCount" className="w-full">
              Student count
            </TabsTrigger>
            <TabsTrigger value="userCount" className="w-full">
              User count
            </TabsTrigger>
            <TabsTrigger value="averageLevel" className="w-full">
              Average level
            </TabsTrigger>
          </TabsList>
          <TabsContent value="studentCount" className="w-full">
            <StudentCountChart />
          </TabsContent>
          <TabsContent value="userCount" className="w-full">
            <UserCountChart />
          </TabsContent>
          <TabsContent value="averageLevel" className="w-full">
            <AverageLevelChart />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};
