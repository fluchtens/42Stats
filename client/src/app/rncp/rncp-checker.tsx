"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { getRncp } from "@/services/rncp.service";
import { Rncp } from "@/types/rncp/rncp.type";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PoolProjects } from "./ui/pool-projects";
import { RncpCard } from "./ui/rncp-card";
import { RncpTabContent } from "./ui/rncp-tab-content";
import { RncpTabTrigger } from "./ui/rncp-tab-trigger";

export const RncpChecker = () => {
  const { user } = useAuth();
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

  const fetchData = async () => {
    const data = await getRncp();
    if (data) {
      setRncp(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user === null && (
        <div className="m-auto max-w-screen-xl">
          <NotAuthAlert />
        </div>
      )}
      {user && (
        <Alert variant="destructive" className="mb-3">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>BETA</AlertTitle>
          <AlertDescription>
            <p>This feature is not yet complete.</p>
            <p>RNCP checker will be available soon.</p>
          </AlertDescription>
        </Alert>
      )}
      {user && (
        <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-1.5 bg-transparent">
            <RncpTabTrigger value="web-and-mobile-application-development" rncp="RNCP 6" title="Web and mobile application development" />
            <RncpTabTrigger value="applicative-software-development" rncp="RNCP 6" title="Applicative software development" />
            <RncpTabTrigger value="network-information-systems-architecture" rncp="RNCP 7" title="Network Information Systems Architecture" />
            <RncpTabTrigger value="database-architecture-and-data" rncp="RNCP 7" title="Database architecture and data" />
          </TabsList>
          {rncp && (
            <>
              <RncpTabContent value="web-and-mobile-application-development">
                <RncpCard title="Suite" projects={rncp.web.suite.projects} />
                <RncpCard title="Web" projects={rncp.web.web.projects}>
                  <PoolProjects title="Symfony" projects={rncp.web.web.symfony} />
                  <PoolProjects title="Django" projects={rncp.web.web.django} />
                  <PoolProjects title="RoR" projects={rncp.web.web.ror} />
                </RncpCard>
                <RncpCard title="Mobile" projects={rncp.web.mobile.projects}>
                  <PoolProjects title="Mobile" projects={rncp.web.mobile.mobile} />
                </RncpCard>
              </RncpTabContent>
              <RncpTabContent value="applicative-software-development">
                <RncpCard title="Suite" projects={rncp.software.suite.projects} />
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
              </RncpTabContent>
              <RncpTabContent value="network-information-systems-architecture">
                <RncpCard title="Suite" projects={rncp.network.suite.projects} />
                <RncpCard title="Unix/Kernel" projects={rncp.network.unix.projects} />
                <RncpCard title="System administration" projects={rncp.network.system.projects} />
                <RncpCard title="Security" projects={rncp.network.security.projects}>
                  <PoolProjects title="Cybersecurity" projects={rncp.network.security.security} />
                </RncpCard>
              </RncpTabContent>
              <RncpTabContent value="database-architecture-and-data">
                <RncpCard title="Suite" projects={rncp.database.suite.projects} />
                <RncpCard title="Web - Database" projects={rncp.database.db.projects}>
                  <PoolProjects title="Symfony" projects={rncp.database.db.symfony} />
                  <PoolProjects title="Django" projects={rncp.database.db.django} />
                  <PoolProjects title="RoR" projects={rncp.database.db.ror} />
                </RncpCard>
                <RncpCard title="Artificial Intelligence" projects={rncp.database.ai.projects}>
                  <PoolProjects title="Data Science" projects={rncp.database.ai.dataScience} />
                  <PoolProjects title="Python for Data Science" projects={rncp.database.ai.python} />
                </RncpCard>
              </RncpTabContent>
            </>
          )}
        </Tabs>
      )}
    </>
  );
};
