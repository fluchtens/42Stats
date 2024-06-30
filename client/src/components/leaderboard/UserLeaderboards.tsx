"use client";

import { getCampuses, getCampusPools } from "@/services/campus.service";
import { getCampusPoolUsers, getCampusPoolUsersCount, getCampusUsers } from "@/services/user.service";
import { Campus } from "@/types/campus.interface";
import { PoolDate } from "@/types/date.interface";
import { SortType } from "@/types/sort.enum";
import { User } from "@/types/user.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CampusSelector } from "./CampusSelector";
import { PoolDateSelector } from "./PoolDateSelector";
import { UsersPagination } from "./UsersPagination";

export const UserLeaderboards = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [campuses, setCampuses] = useState<Campus[] | null>(null);
  const [campusId, setCampusId] = useState<number>(Number(useSearchParams().get("campus")) || 0);
  const [users, setUsers] = useState<User[] | null>(null);
  const [availablePoolDates, setAvailablePoolDates] = useState<PoolDate[] | null>(null);
  const [poolDate, setPoolDate] = useState<PoolDate | null>(null);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Campus);
  const [currentPage, setCurrentPage] = useState<number>(Number(useSearchParams().get("page")) || 1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize: number = 42;

  const updateCampusUsers = async () => {
    const campuses = await getCampuses();
    setCampuses(campuses);

    const users = await getCampusUsers(campusId, currentPage, pageSize);
    setUsers(users);

    const campus = campuses?.find((campus) => campus.id === campusId);
    if (campus) {
      const totalPages = Math.ceil(campus.studentCount / pageSize);
      setTotalPages(totalPages);
    }

    const pools = await getCampusPools(campusId);
    setAvailablePoolDates(pools);
  };

  const updatePoolUsers = async () => {
    if (!campusId || !poolDate) return;

    const users = await getCampusPoolUsers(campusId, poolDate.month, poolDate.year, currentPage, pageSize);
    console.log(users);
    setUsers(users);

    const userCount = await getCampusPoolUsersCount(campusId, poolDate.month, poolDate.year);
    if (userCount) {
      const totalPages = Math.ceil(userCount / pageSize);
      setTotalPages(totalPages);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const campuses = await getCampuses();
      setCampuses(campuses);
      setFirstLoad(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setUsers(null);
    setAvailablePoolDates(null);
    setSortBy(SortType.Campus);
    setCurrentPage(1);
    setTotalPages(1);
    updateCampusUsers();
    const params = new URLSearchParams(searchParams.toString());
    params.set("campus", campusId.toString());
    params.set("page", currentPage.toString());
    router.push(pathname + "?" + params.toString());
  }, [campusId]);

  useEffect(() => {
    setUsers(null);
    setSortBy(SortType.PoolDate);
    setCurrentPage(1);
    setTotalPages(1);
    updatePoolUsers();
  }, [poolDate]);

  useEffect(() => {
    setUsers(null);
    if (sortBy === SortType.Campus) {
      updateCampusUsers();
    } else if (sortBy === SortType.PoolDate) {
      updatePoolUsers();
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("campus", campusId.toString());
    params.set("page", currentPage.toString());
    router.push(pathname + "?" + params.toString());
  }, [currentPage]);

  return (
    <div className="flex-col flex gap-12">
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
                <tr key={index} className={`${index !== users.length - 1 ? "border-b border-opacity-5" : ""} text-base font-normal`}>
                  <td className="py-4 text-left">{(currentPage - 1) * users.length + index + 1}</td>
                  <td className="py-4 flex justify-start items-center gap-4 text-left">
                    <Avatar className="w-16 h-16 rounded-full">
                      <AvatarImage src={`${user.image ? user.image : "noavatar"}`} className="object-cover pointer-events-none" />
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
          <UsersPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  );
};
