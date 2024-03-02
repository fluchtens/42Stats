import { getAllUsers } from "@/services/user.service";

export default async function Leaderboard() {
  const users = await getAllUsers();

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-2">
        {users && (
          <table className="w-full">
            <thead>
              <tr className="text-base font-semibold">
                <th className="text-left">#</th>
                <th className="text-left">User</th>
                <th className="text-right">Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index !== users.length - 1
                      ? "border-b border-slate-200 border-opacity-5"
                      : ""
                  } text-base font-normal`}
                >
                  <td className="py-4 text-left">{index + 1}</td>
                  <td className="py-4 flex justify-start items-center gap-3 text-left">
                    <img
                      src={user.image}
                      alt={user.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {user.login}
                  </td>
                  <td className="py-4 text-right">{user.level.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
