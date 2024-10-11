"use client";

import { Rncp } from "@/app/rncp/types/rncp.type";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
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
    const response = await fetch("http://localhost:8080/rncp", {
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
                <RncpCard title="Web" projects={rncp.web.web.projects}>
                  <PoolProjects title="Symfony" projects={rncp.web.web.symfony} />
                  <PoolProjects title="Django" projects={rncp.web.web.django} />
                  <PoolProjects title="RoR" projects={rncp.web.web.ror} />
                </RncpCard>
                <RncpCard title="Mobile" projects={rncp.web.mobile.projects}>
                  <PoolProjects title="Mobile" projects={rncp.web.mobile.mobile} />
                </RncpCard>
                <RncpCard title="Suite" projects={rncp.web.suite.projects} />
              </div>
            </TabsContent>
            <TabsContent value="applicative-software-development" className="mt-6">
              <div className="grid md:grid-cols-2 gap-3">
                <RncpCard title="Object Oriented Programming" projects={rncp.software.oop.projects}>
                  <PoolProjects title="Symfony" projects={rncp.software.oop.symfony} />
                  <PoolProjects title="Django" projects={rncp.software.oop.django} />
                  <PoolProjects title="RoR" projects={rncp.software.oop.ror} />
                  <PoolProjects title="Mobile" projects={rncp.software.oop.mobile} />
                  <PoolProjects title="Object" projects={rncp.software.oop.object} />
                </RncpCard>
                <RncpCard title="Functional programming" projects={rncp.software.fp.projects}>
                  <PoolProjects title="OCaml" projects={rncp.software.fp.ocaml} />
                </RncpCard>
                <RncpCard title="Imperative programming" projects={rncp.software.ip.projects} />
                <RncpCard title="Suite" projects={rncp.software.suite.projects} />
              </div>
            </TabsContent>
            <TabsContent value="network-information-systems-architecture" className="mt-6">
              <div className="grid md:grid-cols-2 gap-3">
                <RncpCard title="Unix/Kernel" projects={rncp.network.unix.projects} />
                <RncpCard title="System administration" projects={rncp.network.system.projects} />
                <RncpCard title="Security" projects={rncp.network.security.projects}>
                  <PoolProjects title="Cybersecurity" projects={rncp.network.security.security} />
                </RncpCard>
                <RncpCard title="Suite" projects={rncp.network.suite.projects} />
              </div>
            </TabsContent>
            <TabsContent value="database-architecture-and-data" className="mt-6">
              <div className="grid md:grid-cols-2 gap-3">
                <RncpCard title="Web - Database" projects={rncp.database.db.projects}>
                  <PoolProjects title="Symfony" projects={rncp.database.db.symfony} />
                  <PoolProjects title="Django" projects={rncp.database.db.django} />
                  <PoolProjects title="RoR" projects={rncp.database.db.ror} />
                </RncpCard>
                <RncpCard title="Artificial Intelligence" projects={rncp.database.ai.projects}>
                  <PoolProjects title="Data Science" projects={rncp.database.ai.dataScience} />
                  <PoolProjects title="Python for Data Science" projects={rncp.database.ai.python} />
                </RncpCard>
                <RncpCard title="Suite" projects={rncp.database.suite.projects} />
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
