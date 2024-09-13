"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AccountTab } from "./tabs/account-tab";
import { DeviceTab } from "./tabs/device-tab";

export const SettingsTabs = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "account";

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.push(`?tab=${currentTab}`);
    }
  }, []);

  return (
    <div>
      {user === null && <NotAuthAlert />}
      {user && (
        <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
          <TabsList className="w-full h-full grid grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="account">Account settings</TabsTrigger>
            <TabsTrigger value="device">Device management</TabsTrigger>
          </TabsList>
          <AccountTab />
          <DeviceTab />
        </Tabs>
      )}
    </div>
  );
};
