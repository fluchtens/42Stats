"use client";

import { CampusSelector } from "@/components/leaderboard/CampusSelector";
import { PoolDateSelector } from "@/components/leaderboard/PoolDateSelector";
import { UsersPagination } from "@/components/leaderboard/UsersPagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvailablePoolDates } from "@/services/getAvailablePoolDates";
import { getCampusUsers } from "@/services/getCampusUsers";
import { getCampusUsersCount } from "@/services/getCampusUsersCount";
import { getCampuses } from "@/services/getCampuses";
import { getMyCampusId } from "@/services/getMyCampusId";
import { getPoolUsers } from "@/services/getPoolUsers";
import { getPoolUsersCount } from "@/services/getPoolUsersCount";
import { PoolDate } from "@/types/date.interface";
import { SortType } from "@/types/sort.enum";
import { FortyTwoCampus, FortyTwoUser } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const session = useSession();
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [campuses, setCampuses] = useState<FortyTwoCampus[] | null>(null);
  const [campusId, setCampusId] = useState<number | null>(null);
  const [users, setUsers] = useState<FortyTwoUser[] | null>(null);
  const [availablePoolDates, setAvailablePoolDates] = useState<PoolDate[] | null>(null);
  const [poolDate, setPoolDate] = useState<PoolDate | null>(null);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Campus);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(useSearchParams().get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const updateCampusUsers = async () => {
    if (campusId) {
      const newUsers = await getCampusUsers(campusId, currentPage, 42);
      setUsers(newUsers);

      const newPoolDates = await getAvailablePoolDates(campusId);
      setAvailablePoolDates(newPoolDates);

      const userCount = await getCampusUsersCount(campusId);
      if (userCount) {
        const totalPages = Math.ceil(userCount / 42);
        setTotalPages(totalPages);
      }
    }
  };

  const updatePoolUsers = async () => {
    if (campusId && poolDate) {
      const newUsers = await getPoolUsers(campusId, poolDate.month, poolDate.year, currentPage, 42);
      setUsers(newUsers);

      const userCount = await getPoolUsersCount(campusId, poolDate.month, poolDate.year);
      if (userCount) {
        const totalPages = Math.ceil(userCount / 42);
        setTotalPages(totalPages);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const campusesFetched = await getCampuses();
      setCampuses(campusesFetched);

      const newCampusId = await getMyCampusId();
      setCampusId(newCampusId);

      setFirstLoad(false);
    };

    if (session.status === "unauthenticated") {
      router.replace("/");
    }

    fetchData();
  }, [session]);

  useEffect(() => {
    if (!firstLoad) {
      setUsers(null);
      setAvailablePoolDates(null);
      // setPoolDate(null);
      setSortBy(SortType.Campus);
      setCurrentPage(1);
      router.push(`/leaderboard/?page=1`);
      setTotalPages(1);
      updateCampusUsers();
    }
  }, [campusId]);

  useEffect(() => {
    if (!firstLoad) {
      setUsers(null);
      setSortBy(SortType.PoolDate);
      setCurrentPage(1);
      setTotalPages(1);
      updatePoolUsers();
    }
  }, [poolDate]);

  useEffect(() => {
    if (!firstLoad) {
      if (sortBy === SortType.Campus) {
        setUsers(null);
        updateCampusUsers();
      } else if (sortBy === SortType.PoolDate) {
        setUsers(null);
        updatePoolUsers();
      }
    }
  }, [currentPage]);

  return (
    <main className="p-6 flex-1">
      <div className="max-w-screen-lg m-auto flex-col flex justify-center gap-12">
        <div className="w-full flex-col md:flex-row flex md:justify-between gap-2">
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
                    <td className="py-4 text-left">
                      {(currentPage - 1) * users.length + index + 1}
                    </td>
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
                    <td className="py-4 text-right">{user.level.toFixed(2)}</td>
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
