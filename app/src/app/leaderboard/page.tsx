"use client";

import { CampusSelector } from "@/components/CampusSelector";
import { PoolDateSelector } from "@/components/PoolDateSelector";
import { getAllUsers } from "@/services/user.service";
import { PoolDate } from "@/types/date.interface";

export default async function Leaderboard() {
  const users = await getAllUsers();
  let poolDates: PoolDate[] = [];

  if (users) {
    poolDates = users.reduce((dates: PoolDate[], user) => {
      const date: PoolDate = { month: user.pool_month, year: user.pool_year };

      const dateExists = dates.some(
        (d) => d.month === date.month && d.year === date.year
      );

      if (!dateExists) {
        dates.push(date);
      }

      return dates;
    }, []);

    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    poolDates.sort((a, b) => {
      const yearA = Number(a.year);
      const yearB = Number(b.year);

      const monthA = monthNames.indexOf(a.month);
      const monthB = monthNames.indexOf(b.month);

      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
  }

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center gap-2">
        <PoolDateSelector dates={poolDates} />
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
