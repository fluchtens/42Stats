import { CampusSelector } from "@/components/CampusSelector";
import { getCampuses } from "@/services/campus.service";
import { getUserById, getUserByLogin } from "@/services/user.service";
import { Campus, User } from "@prisma/client";

export default async function Home() {
  const campuses: Campus[] | null = await getCampuses();
  const user: User | null = await getUserByLogin("fluchten");

  return (
    <main className="p-6">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-5">
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl md:text-8xl font-extrabold text-transparent">
          42stats
        </h1>
        {user && (
          <div>
            <h2>
              Welcome back, {user.first_name} {user.last_name}!
            </h2>
            <ul className="list-disc">
              <li>id: {user.id}</li>
              <li>email: {user.email}</li>
              <li>login: {user.login}</li>
              <li>first_name: {user.first_name}</li>
              <li>last_name: {user.last_name}</li>
              <li>image: {user.image}</li>
              <li>pool_month: {user.pool_month}</li>
              <li>pool_year: {user.pool_year}</li>
              <li>level: {user.level.toString()}</li>
              <li>campus_id: {user.campus_id}</li>
            </ul>
          </div>
        )}
        <CampusSelector campuses={campuses} />
      </div>
    </main>
  );
}
