"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { getQueryParam } from "@/utils/getQueryParam";
import { updateUrlParams } from "@/utils/updateUrlParams";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FortyTwoStatsTab } from "./tabs/forty-two/FortyTwoStatsTab";
import { MainStatsTab } from "./tabs/main/MainStatsTab";

export const Stats = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = getQueryParam(location.search, "tab") || "42";

  const handleTabChange = (value: string) => {
    updateUrlParams(navigate, location, { tab: value });
  };

  useEffect(() => {
    if (!getQueryParam(location.search, "tab")) {
      updateUrlParams(navigate, location, { tab: currentTab });
    }
  }, []);

  return (
    <>
      {user && (
        <div className="max-w-screen-xl m-auto">
          <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4 w-full h-full grid grid-cols-1 md:grid-cols-2">
              <TabsTrigger value="42">42</TabsTrigger>
              <TabsTrigger value="42stats">42Stats</TabsTrigger>
            </TabsList>
            <MainStatsTab />
            <FortyTwoStatsTab />
          </Tabs>
        </div>
      )}
    </>
  );
};
