"use client";

import { initCampus } from "@/services/42.service";

export default function Home() {
  const fetchData = async () => {
    await initCampus();
  };

  return (
    <main>
      <h1>Hello World</h1>
      <button className="bg-red-500" onClick={fetchData}>
        Fetch campuses
      </button>
    </main>
  );
}
