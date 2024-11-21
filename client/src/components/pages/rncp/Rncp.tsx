import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { getRncp } from "@/services/RncpService";
import { Rncp } from "@/types/rncp/Rncp";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUrlParams } from "../../../utils/updateUrlParams";
import { PoolProjects } from "./ui/PoolProjects";
import { RncpCard } from "./ui/RncpCard";
import { RncpTabContent } from "./ui/RncpTabContent";
import { RncpTabTrigger } from "./ui/RncpTabTrigger";

export const RncpChecker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rncp, setRncp] = useState<Rncp | null>(null);
  const currentTab = new URLSearchParams(location.search).get("tab") || "web-and-mobile-application-development";

  const handleTabChange = (value: string) => {
    updateUrlParams(navigate, location, { tab: value });
  };

  useEffect(() => {
    if (!new URLSearchParams(location.search).get("tab")) {
      updateUrlParams(navigate, location, { tab: currentTab });
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
    <div className="max-w-screen-2xl m-auto">
      <Alert variant="destructive" className="mb-3">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>BETA</AlertTitle>
        <AlertDescription>
          <p>This feature is not yet complete.</p>
          <p>RNCP checker will be available soon.</p>
        </AlertDescription>
      </Alert>
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
    </div>
  );
};
