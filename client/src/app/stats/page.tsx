// "use server";

// import { HorizontalBarChart } from "@/components/stats/HorizontalBarChart";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { auth } from "@/lib/auth";
// import { getCampusesAvgLevels } from "@/services/getCampusesAvgLevels";
// import { getCampusesNames } from "@/services/getCampusesNames";
// import { getCampusesUsersCount } from "@/services/getCampusesUsersCount";
// import { redirect } from "next/navigation";

// export default async function Stats() {
//   const session = await auth();
//   if (!session?.user) {
//     redirect("/");
//   }

//   const campusesNames = await getCampusesNames();
//   const campusesAvgLevels = await getCampusesAvgLevels();
//   const campusesUsersCount = await getCampusesUsersCount();

//   return (
//     <main className="p-6 flex-1">
//       <div className="max-w-screen-lg m-auto flex-col flex justify-center items-center gap-4">
//         <h1 className="text-base md:text-xl font-base">Statistics about all 42 campuses.</h1>
//         <Tabs
//           defaultValue="usersCount"
//           className="w-full flex flex-col justify-center items-center"
//         >
//           <TabsList className="h-full flex flex-col md:flex-row">
//             <TabsTrigger value="usersCount" className="w-full">
//               Users count
//             </TabsTrigger>
//             <TabsTrigger value="averageLevel" className="w-full">
//               Average level
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="usersCount" className="w-full">
//             <HorizontalBarChart
//               label="Users count"
//               campusesNames={campusesNames}
//               campusesLevels={campusesUsersCount}
//             />
//           </TabsContent>
//           <TabsContent value="averageLevel" className="w-full">
//             <HorizontalBarChart
//               label="Average level"
//               campusesNames={campusesNames}
//               campusesLevels={campusesAvgLevels}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </main>
//   );
// }
