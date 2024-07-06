"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AverageLevelChart } from "./charts/AverageLevelChart";
import { StudentCountChart } from "./charts/StudentCountChart";
import { UserCountChart } from "./charts/UserCountChart";

export const FortyTwoCampusesRankingTabs = () => (
  <Tabs defaultValue="studentCount">
    <TabsList>
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
);
