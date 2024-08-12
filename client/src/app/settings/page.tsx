"use server";

import { SettingsTabs } from "./settings-tabs";

export default async function Settings() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto">
        <SettingsTabs />
      </div>
    </main>
  );
}
