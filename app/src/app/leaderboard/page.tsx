"use client";

import { CampusSelector } from "@/components/CampusSelector";
import { PoolDateSelector } from "@/components/PoolDateSelector";
import { getCampuses } from "@/services/campus.service";
import { getPoolDates } from "@/services/date.service";
import { getCampusUsers, getPoolUsers } from "@/services/user.service";
import { PoolDate } from "@/types/date.interface";
import { Campus, User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [campuses, setCampuses] = useState<Campus[] | null>(null);
  const [campusId, setCampusId] = useState<number | null>(12);
  const [users, setUsers] = useState<User[] | null>(null);
  const [availablePoolDates, setAvailablePoolDates] = useState<PoolDate[] | null>(null);
  const [poolDate, setPoolDate] = useState<PoolDate | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const campusesFetched = await getCampuses();
      setCampuses(campusesFetched);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (campusId) {
        const newUsers = await getCampusUsers(campusId);
        const newPoolDates = await getPoolDates(campusId);
        setUsers(newUsers);
        setAvailablePoolDates(newPoolDates);
      }
    };
    setCampusId(null);
    setAvailablePoolDates(null);
    fetchData();
  }, [campusId]);

  useEffect(() => {
    const fetchData = async () => {
      if (poolDate) {
        const newUsers = await getPoolUsers(poolDate.month, poolDate.year);
        setUsers(newUsers);
      }
    };
    setUsers(null);
    fetchData();
  }, [poolDate]);

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center gap-2">
        <div className="w-full flex justify-between items-center gap-2">
          <CampusSelector campuses={campuses} setCampusId={setCampusId} />
          <PoolDateSelector dates={availablePoolDates} setPoolDate={setPoolDate} />
        </div>
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
                    index !== users.length - 1 ? "border-b border-slate-200 border-opacity-5" : ""
                  } text-base font-normal`}
                >
                  <td className="py-4 text-left">{index + 1}</td>
                  <td className="py-4 flex justify-start items-center gap-4 text-left">
                    <img
                      src={user.image}
                      alt={user.image}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {user.login}
                  </td>
                  <td className="py-4 text-right">{Number(user.level.toString()).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
