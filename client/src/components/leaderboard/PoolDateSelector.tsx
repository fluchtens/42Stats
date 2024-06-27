// import { PoolDate } from "@/types/date.interface";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface PoolDateSelectorProps {
//   dates: PoolDate[] | null;
//   setPoolDate: (date: PoolDate) => void;
// }

// export const PoolDateSelector = ({ dates, setPoolDate }: PoolDateSelectorProps) => {
//   const handleSelect = (date: string) => {
//     const [month, year] = date.split("-");
//     setPoolDate({ month, year });
//   };

//   return (
//     <div className="flex-col flex">
//       <span className="text-base font-medium">Pool date:</span>
//       <Select onValueChange={handleSelect}>
//         <SelectTrigger className="w-60">
//           <SelectValue placeholder="Select a pool date..." />
//         </SelectTrigger>
//         <SelectContent>
//           {dates &&
//             dates.map((date, index) => (
//               <SelectItem key={index} value={`${date.month}-${date.year}`}>
//                 {date.month} {date.year}
//               </SelectItem>
//             ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };
