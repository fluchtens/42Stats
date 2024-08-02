"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { useAuth } from "@/hooks/useAuth";
import { FortyTwoStats } from "./forty-two/FortyTwoStats";
import { MainStats } from "./main/MainStats";

export const Statistics = () => {
  const { user } = useAuth();

  return (
    <div className="flex-col flex gap-10">
      {user === null && <NotAuthAlert />}
      {user && (
        <>
          <MainStats />
          <FortyTwoStats />
        </>
      )}
    </div>
  );
};
