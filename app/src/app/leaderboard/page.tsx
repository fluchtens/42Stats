"use client";

import { CampusSelector } from "@/components/CampusSelector";
import { PoolDateSelector } from "@/components/PoolDateSelector";
import { getCampuses } from "@/services/campus.service";
import { getPoolDates } from "@/services/date.service";
import { getCampusUsers, getPoolUsers } from "@/services/user.service";
import { PoolDate } from "@/types/date.interface";
import { Campus, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Leaderboard() {
  const router = useRouter();
  const [campuses, setCampuses] = useState<Campus[] | null>(null);
  const [campusId, setCampusId] = useState<number | null>(12);
  const [users, setUsers] = useState<User[] | null>(null);
  const [availablePoolDates, setAvailablePoolDates] = useState<PoolDate[] | null>(null);
  const [poolDate, setPoolDate] = useState<PoolDate | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(useSearchParams().get("page")) || 1
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) {
      return;
    }
    setCurrentPage(newPage);
    router.push(`/leaderboard/?page=${newPage}`);
  };

  const UsersPagination = () => {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(2)}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

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
  }, [campusId]);

  useEffect(() => {
    const fetchData = async () => {
      if (campusId && poolDate) {
        const newUsers = await getPoolUsers(campusId, poolDate.month, poolDate.year, currentPage);
        setUsers(newUsers);
      }
    };
    setUsers(null);
    fetchData();
  }, [poolDate, currentPage]);

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
            <UsersPagination />
          </>
        )}
      </div>
    </main>
  );
}
