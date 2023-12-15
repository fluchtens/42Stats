import { CampusSelector } from "@/components/CampusSelector";
import { getAllCampus } from "@/services/db.service";

export default async function Leaderboard() {
  const campus = await getAllCampus();

  return (
    <main>
      <h1>Leaderboard</h1>
      <ul>{campus && <CampusSelector campus={campus} />}</ul>
    </main>
  );
}
