"use client";

import { NotAuthAlert } from "@/components/not-auth-alert";
import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { updateUrlParams } from "@/lib/updateUrlParams";
import { getCampuses, getCampusPools } from "@/services/campus.service";
import { getCampusPoolUsers, getCampusPoolUsersCount, getCampusUsers } from "@/services/user.service";
import { PoolDate } from "@/types/date.interface";
import { Campus } from "@/types/models/campus.interface";
import { User } from "@/types/models/user.interface";
import { SortType } from "@/types/sort.enum";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiBlackHoleBolas } from "react-icons/gi";
import { CampusSelector } from "./ui/selectors/campus-selector";
import { PoolDateSelector } from "./ui/selectors/pool-date-selector";
import { UserPagination } from "./ui/user-pagination";

export const UserLeaderboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [users, setUsers] = useState<User[] | null | undefined>(undefined);
  const [campuses, setCampuses] = useState<Campus[] | null>(null);
  const [campusId, setCampusId] = useState<number | null>(Number(searchParams.get("campus")) || null);
  const [availablePoolDates, setAvailablePoolDates] = useState<PoolDate[] | null>(null);
  let poolDateParams: PoolDate | null = null;
  const poolMonthParam = searchParams.get("poolMonth");
  const poolYearParam = searchParams.get("poolYear");
  if (poolMonthParam && poolYearParam) {
    poolDateParams = {
      month: poolMonthParam,
      year: poolYearParam,
    };
  }
  const [poolDate, setPoolDate] = useState<PoolDate | null>(poolDateParams);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Campus);
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 42;

  const updateCampuses = async () => {
    const data = await getCampuses();
    if (data && data.length) {
      setCampuses(data);
    }
  };

  const updateCampusPools = async () => {
    if (!campusId) return;

    const fetchedPools = await getCampusPools(campusId);
    if (fetchedPools && fetchedPools.length) {
      setAvailablePoolDates(fetchedPools);
    }
  };

  const updateCampusUsers = async () => {
    if (!campusId) return;

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
    setUsers(users);

    const userCount = await getCampusPoolUsersCount(campusId, poolDate.month, poolDate.year);
    if (userCount) {
      const totalPages = Math.ceil(userCount / pageSize);
      setTotalPages(totalPages);
    }
  };

  useEffect(() => {
    if (!user) return;

    updateCampuses();
    if (!campusId) {
      setCampusId(user.campusId);
    } else {
      updateCampusPools();
      if (poolDate) {
        setSortBy(SortType.PoolDate);
        updatePoolUsers();
      } else {
        setSortBy(SortType.Campus);
        updateCampusUsers();
      }
    }
    setFirstLoad(false);
  }, [user]);

  useEffect(() => {
    if (firstLoad || !campusId) return;

    setUsers(undefined);
    setAvailablePoolDates(null);
    setPoolDate(null);
    setSortBy(SortType.Campus);
    setCurrentPage(1);
    setTotalPages(1);
    updateCampusUsers();
    updateUrlParams(router, pathname, searchParams, { campus: campusId, page: 1, poolMonth: null, poolYear: null });
  }, [campusId]);

  useEffect(() => {
    if (firstLoad || !campusId || !poolDate) return;

    setUsers(undefined);
    setSortBy(SortType.PoolDate);
    setCurrentPage(1);
    setTotalPages(1);
    updatePoolUsers();
    updateUrlParams(router, pathname, searchParams, { campus: campusId, page: 1, poolMonth: poolDate.month, poolYear: poolDate.year });
  }, [poolDate]);

  useEffect(() => {
    if (firstLoad || !campusId) return;

    setUsers(undefined);
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
    <div className="flex flex-col">
      {user === null && <NotAuthAlert />}
      {user && (
        <>
          <PageHeader title="Student Leaderboard" description="Ranking of student by descending level." />
          <div className="mt-6 w-full flex-col md:flex-row flex md:justify-between gap-2">
            <CampusSelector campuses={campuses} campusId={campusId} setCampusId={setCampusId} />
            <PoolDateSelector dates={availablePoolDates} poolDate={poolDate} setPoolDate={setPoolDate} />
          </div>
          {(users === null || (users && users.length < 1)) && (
            <Alert variant="destructive" className="mt-10">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>No users found</AlertTitle>
              <AlertDescription>
                <p>No user was found with the specified parameters.</p>
                <p>If data is currently being updated from API 42, please try again later.</p>
              </AlertDescription>
            </Alert>
          )}
          {users && users.length > 0 && (
            <>
              <table className="mt-10 w-full">
                <thead>
                  <tr className="text-base font-semibold">
                    <th className="text-left w-1/12">#</th>
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
                          <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
                          {user.image && <AvatarImage src={user.image} className="object-cover pointer-events-none" />}
                        </Avatar>
                        <a
                          href={`https://profile.intra.42.fr/users/${user.login}`}
                          target="_blank"
                          className="cursor-pointer hover:text-muted-foreground hover:underline"
                        >
                          {user.login}
                        </a>
                        {user.blackholed && <GiBlackHoleBolas className="w-[1.5rem] h-[1.5rem] text-destructive" />}
                      </td>
                      <td className="py-4 text-right">{user.level.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && <UserPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
            </>
          )}
        </>
      )}
    </div>
  );
};
