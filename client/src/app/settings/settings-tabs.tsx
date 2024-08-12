"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { AccountTab } from "./account-tab";
import { DeviceTab } from "./device-tab";

export const SettingsTabs = () => {
  const { user } = useAuth();

  return (
    <div>
      {user === null && <NotAuthAlert />}
      {user && (
        <Tabs defaultValue="account">
          <TabsList className="w-full h-full grid sm:grid-cols-2">
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
