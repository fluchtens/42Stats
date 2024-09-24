"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Rncp } from "@/types/rncp.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PoolProjects } from "./ui/pool-projects";
import { RncpCard } from "./ui/rncp-card";
import { RncpTabTrigger } from "./ui/rncp-tab-trigger";

export const RncpChecker = () => {
  const [rncp, setRncp] = useState<Rncp | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "web-and-mobile-application-development";

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.push(`?tab=${currentTab}`);
    }
  }, []);

  const fetchRncp = async (): Promise<Rncp | null> => {
    const response = await fetch("http://localhost:8080/projects/rncp", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  };

  const fetchData = async () => {
    const data = await fetchRncp();
    if (data) {
      setRncp(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-1.5 bg-transparent">
          <RncpTabTrigger value="web-and-mobile-application-development" rncp="RNCP 6" title="Web and mobile application development" />
          <RncpTabTrigger value="applicative-software-development" rncp="RNCP 6" title="Applicative software development" />
          <RncpTabTrigger value="network-information-systems-architecture" rncp="RNCP 7" title="Network Information Systems Architecture" />
          <RncpTabTrigger value="database-architecture-and-data" rncp="RNCP 7" title="Database architecture and data" />
        </TabsList>
        {rncp && (
          <>
            <TabsContent value="web-and-mobile-application-development" className="mt-6">
              <div className="grid md:grid-cols-2 gap-3">
                <RncpCard title="Web" projects={rncp.web.projects}>
                  <PoolProjects title="Symfony" projects={rncp.web.symfony} />
                  <PoolProjects title="Django" projects={rncp.web.django} />
                  <PoolProjects title="RoR" projects={rncp.web.ror} />
                </RncpCard>
                <RncpCard title="Mobile" projects={rncp.mobile.projects}>
                  <PoolProjects title="Mobile" projects={rncp.mobile.mobile} />
                </RncpCard>
                <RncpCard title="Suite" projects={rncp.suite.projects} />
              </div>
            </TabsContent>
            <TabsContent value="applicative-software-development" className="mt-6">
              <div className="grid md:grid-cols-2 gap-3"></div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
