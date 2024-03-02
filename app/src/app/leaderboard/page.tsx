import { getAllUsers } from "@/services/user.service";

export default async function Leaderboard() {
  const users = await getAllUsers();

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-2">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Login</th>
              <th>Level</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
}
