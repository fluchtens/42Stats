// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { useDebounce } from "@/hooks/use-debounce";
// import { getAccountsCount, getAllAccount } from "@/services/AccountService";
// import { Account } from "@/types/models/Account";
// import { convertDate } from "@/utils/convertDate";
// import { getQueryParam } from "@/utils/getQueryParam";
// import { updateUrlParams } from "@/utils/updateUrlParams";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { UsersSortSelector } from "./ui/account-sort-selector";
// import { TablePagination } from "./ui/table-pagination";

// const PAGE_SIZE = 20;

// export function AdminAccountList() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [firstLoad, setFirstLoad] = useState<boolean>(true);
//   const [users, setUsers] = useState<Account[] | null | undefined>(undefined);
//   const [search, setSearch] = useState<string>(getQueryParam(location.search, "search") || "");
//   const debouncedSearch = useDebounce(search);
//   const [sort, setSort] = useState<string>(getQueryParam(location.search, "sort") || "first_name");
//   const [currentPage, setCurrentPage] = useState<number>(Number(getQueryParam(location.search, "page")) || 1);
//   const [totalPages, setTotalPages] = useState<number>(1);

//   const updateUsers = async (search: string) => {
//     setUsers(undefined);
//     setTotalPages(1);

//     const fetchedUsers = await getAllAccount(/*search, sort, "asc", currentPage, PAGE_SIZ*/);
//     if (!fetchedUsers || fetchedUsers.length === 0) {
//       setUsers(null);
//     } else {
//       setUsers(fetchedUsers);
//     }

//     const fetchedCount = await getAccountsCount(/*search*/);
//     if (fetchedCount) {
//       const totalPages = Math.ceil(fetchedCount / PAGE_SIZE);
//       setTotalPages(totalPages);
//     }
//   };

//   useEffect(() => {
//     updateUsers(debouncedSearch);
//     setFirstLoad(false);

//     updateUrlParams(navigate, location, { sort: sort, page: currentPage, search: debouncedSearch });
//   }, []);

//   useEffect(() => {
//     if (firstLoad) return;

//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     } else {
//       updateUsers(debouncedSearch);
//     }
//     updateUrlParams(navigate, location, { search: debouncedSearch });
//   }, [debouncedSearch]);

//   useEffect(() => {
//     if (firstLoad) return;

//     if (currentPage !== 1) {
//       setCurrentPage(1);
//     } else {
//       updateUsers(debouncedSearch);
//     }
//     updateUrlParams(navigate, location, { sort: sort });
//   }, [sort]);

//   useEffect(() => {
//     if (firstLoad) return;

//     updateUsers(debouncedSearch);
//     updateUrlParams(navigate, location, { page: currentPage });
//   }, [currentPage]);

//   return (
//     <div className="flex flex-col gap-4">
//       <h1 className="text-2xl font-bold">Account list</h1>
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
//         <UsersSortSelector sort={sort} setSort={setSort} />
//         <Input
//           name="search-users"
//           value={search}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
//           placeholder={"pages.admin.users.search"}
//           className="md:max-w-[20rem]"
//           autoComplete="off"
//         />
//       </div>
//       <table>
//         <thead className="text-left">
//           <th>User</th>
//           <th>Level</th>
//           <th>Campus</th>
//           <th>Created at</th>
//           <th>Updated at</th>
//         </thead>
//         <tbody>
//           {users &&
//             users.map((user) => (
//               <tr key={user.id} className="text-sm">
//                 <td className="p-2 flex items-center gap-2 border-b">
//                   <Avatar className="w-10 h-10 rounded-full">
//                     <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
//                     {user.image && <AvatarImage src={user.image} className="object-cover pointer-events-none" />}
//                   </Avatar>
//                   <div className="flex items-center gap-1">
//                     <span className="text-base font-semibold">{user.login}</span>
//                     <span className="text-sm font-normal text-muted-foreground">{user.email}</span>
//                   </div>
//                 </td>
//                 <td className="p-2 border-b">{user.level}</td>
//                 <td className="p-2 border-b">{user.campus_id}</td>
//                 <td className="p-2 border-b">{convertDate(user.created_at)}</td>
//                 <td className="p-2 border-b">{convertDate(user.updated_at)}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       {users && totalPages > 1 && <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
//     </div>
//   );
// }
