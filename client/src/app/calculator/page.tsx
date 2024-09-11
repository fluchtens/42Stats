"use server";

import { Calculator } from "./calculator";

export default async function Xp() {
  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto">
        <Calculator />
      </div>
    </main>
  );
}
