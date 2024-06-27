// import { FortyTwoCampus } from "@prisma/client";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface CampusSelectorProps {
//   campuses: FortyTwoCampus[] | null;
//   setCampusId: (campus: number) => void;
// }

// export const CampusSelector = ({ campuses, setCampusId }: CampusSelectorProps) => {
//   const handleSelect = (campusId: string) => {
//     setCampusId(Number(campusId));
//   };

//   return (
//     <div className="flex-col flex">
//       <span className="text-base font-medium">Campus:</span>
//       <Select onValueChange={handleSelect}>
//         <SelectTrigger className="w-60">
//           <SelectValue placeholder="Select a campus..." />
//         </SelectTrigger>
//         <SelectContent>
//           {campuses &&
//             campuses.map((campus, index) => (
//               <SelectItem key={index} value={campus.id.toString()}>
//                 {campus.name} ({campus.country})
//               </SelectItem>
//             ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };
