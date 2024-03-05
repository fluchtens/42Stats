"use client";

import { CampusSelector } from "@/components/CampusSelector";
import { PoolDateSelector } from "@/components/PoolDateSelector";
import { getCampuses } from "@/services/campus.service";
import { getPoolDates } from "@/services/date.service";
import { getCampusUsers, getPoolUsers, getTotalPoolUsers } from "@/services/user.service";
import { PoolDate } from "@/types/date.interface";
import { Campus, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UsersPagination } from "@/components/leaderboard/UsersPagination";

enum SortType {
  Campus = 1,
  PoolDate,
}

export default function Leaderboard() {
  const router = useRouter();
  const [campuses, setCampuses] = useState<Campus[] | null>(null);
  const [campusId, setCampusId] = useState<number | null>(12);
  const [users, setUsers] = useState<User[] | null>(null);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Campus);
  const [availablePoolDates, setAvailablePoolDates] = useState<PoolDate[] | null>(null);
  const [poolDate, setPoolDate] = useState<PoolDate | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(useSearchParams().get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(1);

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
    setUsers(null);
    setAvailablePoolDates(null);
    fetchData();
    setSortBy(SortType.Campus);
  }, [campusId]);

  useEffect(() => {
    const fetchData = async () => {
      if (campusId && poolDate) {
        const page = currentPage;
        const pageSize = 42;

        const newUsers = await getPoolUsers(
          campusId,
          poolDate.month,
          poolDate.year,
          page,
          pageSize
        );
        setUsers(newUsers);

        const totalUsers = await getTotalPoolUsers(campusId, poolDate.month, poolDate.year);
        if (totalUsers && totalUsers.length > 0) {
          const totalPages = Math.ceil(totalUsers.length / pageSize);
          setTotalPages(totalPages);
          console.log(totalPages);
        }
      }
    };
    setUsers(null);
    fetchData();
    setSortBy(SortType.PoolDate);
  }, [poolDate]);

  useEffect(() => {
    if (sortBy === SortType.PoolDate) {
      const fetchData = async () => {
        if (campusId && poolDate) {
          const page = currentPage;
          const pageSize = 42;

          const newUsers = await getPoolUsers(
            campusId,
            poolDate.month,
            poolDate.year,
            page,
            pageSize
          );
          setUsers(newUsers);

          const totalUsers = await getTotalPoolUsers(campusId, poolDate.month, poolDate.year);
          if (totalUsers && totalUsers.length > 0) {
            const totalPages = Math.ceil(totalUsers.length / pageSize);
            setTotalPages(totalPages);
          }
        }
      };
      setUsers(null);
      fetchData();
    }
  }, [currentPage]);

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center gap-12">
        <div className="w-full flex justify-between items-center gap-2">
          <CampusSelector campuses={campuses} setCampusId={setCampusId} />
          <PoolDateSelector dates={availablePoolDates} setPoolDate={setPoolDate} />
        </div>
        {users && (
          <>
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
                      <Avatar className="w-16 h-16 rounded-full">
                        <AvatarImage
                          src={`${user.image ? user.image : "noavatar"}`}
                          className="object-cover pointer-events-none"
                        />
                        <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <a
                        href={`https://profile.intra.42.fr/users/${user.login}`}
                        target="_blank"
                        className="cursor-pointer hover:text-zinc-400 hover:underline"
                      >
                        {user.login}
                      </a>
                    </td>
                    <td className="py-4 text-right">{Number(user.level.toString()).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <UsersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
