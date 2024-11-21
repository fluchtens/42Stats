import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQueryParam } from "@/utils/getQueryParam";
import { updateUrlParams } from "@/utils/updateUrlParams";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountTab } from "./tabs/AccountTab";
import { DeviceTab } from "./tabs/DeviceTab";

export const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = getQueryParam(location.search, "tab") || "account";

  const handleTabChange = (value: string) => {
    updateUrlParams(navigate, location, { tab: value });
  };

  useEffect(() => {
    if (!getQueryParam(location.search, "tab")) {
      updateUrlParams(navigate, location, { tab: currentTab });
    }
  }, []);

  return (
    <div className="max-w-screen-xl m-auto">
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <TabsList className="w-full h-full grid grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="account">Account settings</TabsTrigger>
          <TabsTrigger value="device">Device management</TabsTrigger>
        </TabsList>
        <AccountTab />
        <DeviceTab />
      </Tabs>
    </div>
  );
};
