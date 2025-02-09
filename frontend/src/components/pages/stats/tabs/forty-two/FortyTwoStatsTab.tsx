import { PageHeader } from "@/components/core/PageHeader";
import { TabsContent } from "@/components/ui/tabs";
import { getCampusCount } from "@/services/CampusService";
import { getUsersAverageLevel, getUsersCount } from "@/services/UserService";
import { useEffect, useState } from "react";
import { StatsCard } from "../../ui/StatsCard";
import { AverageLevelChart } from "./ui/AverageLevelChart";
import { StudentCountChart } from "./ui/StudentCountChart";

export const FortyTwoStatsTab = () => {
  const [campusCount, setCampusCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [averageLevel, setAverageLevel] = useState<number>(0);

  const fetchData = async () => {
    const fetchedCampusCount = await getCampusCount();
    if (fetchedCampusCount) {
      setCampusCount(fetchedCampusCount);
    }

    const fetchedUserCount = await getUsersCount();
    if (fetchedUserCount) {
      setUserCount(fetchedUserCount);
    }

    const fetchedAverageLevel = await getUsersAverageLevel();
    if (fetchedAverageLevel) {
      setAverageLevel(fetchedAverageLevel);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TabsContent value="42">
      <PageHeader title="Statistics about 42" description="These statistics concern data from api.intra.42.fr" />
      <div className="mt-4 grid md:grid-cols-3 gap-2 md:gap-4">
        <StatsCard title="Campuses" desc="Number of campuses." value={campusCount} />
        <StatsCard title="Students" desc="Number of students." value={userCount} />
        <StatsCard title="Average level" desc="Average level of students." value={averageLevel.toFixed(2)} />
      </div>
      <div className="mt-2 md:mt-4 grid gap-2 md:gap-4">
        <StudentCountChart />
        <AverageLevelChart />
      </div>
    </TabsContent>
  );
};
