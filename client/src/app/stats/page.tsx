"use server";

import { Statistics } from "./statistics";

export default async function Stats() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto">
        <Statistics />
      </div>
    </main>
  );
}
