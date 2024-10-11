"use server";

import { RncpChecker } from "./rncp-checker";

export default async function Rncp() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-2xl m-auto">
        <RncpChecker />
      </div>
    </main>
  );
}
