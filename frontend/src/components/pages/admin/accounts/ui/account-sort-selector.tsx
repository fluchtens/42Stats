// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface UsersSortSelectorProps {
//   sort: string;
//   setSort: (sort: string) => void;
// }

// export const UsersSortSelector = ({ sort, setSort }: UsersSortSelectorProps) => {
//   const sortOptions: Record<string, string> = {
//     first_name: "pages.admin.users.sort.first_name",
//     last_name: "pages.admin.users.sort.last_name",
//     email: "pages.admin.users.sort.email",
//     created_at: "pages.admin.users.sort.created_at",
//   };

//   return (
//     <Select value={sort} onValueChange={setSort}>
//       <SelectTrigger className="md:w-48">
//         <SelectValue placeholder={"pages.admin.users.sort.label"}>
//           {sort && (
//             <>
//               <span className="font-bold">{"pages.admin.users.sort.label"}:</span> {sortOptions[sort]}
//             </>
//           )}
//         </SelectValue>
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {Object.entries(sortOptions).map(([value, label]) => (
//             <SelectItem key={value} value={value}>
//               {label}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };
