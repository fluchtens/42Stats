import { CampusSelector } from "@/components/CampusSelector";
import { getCampuses } from "@/services/campus.service";
import { Campus } from "@prisma/client";

export default async function Home() {
  const campuses: Campus[] | null = await getCampuses();

  return (
    <main>
      <h1>42stats</h1>
      <CampusSelector campuses={campuses} />
    </main>
  );
}
