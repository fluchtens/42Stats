// "use server";

// import { UserLeaderboards } from "@/components/leaderboard/UserLeaderboards";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function Leaderboard() {
//   const session = await auth();
//   if (!session?.user) {
//     redirect("/");
//   }

//   return (
//     <main className="p-6 flex-1">
//       <div className="max-w-screen-lg m-auto flex-col flex gap-4">
//         <UserLeaderboards />
//       </div>
//     </main>
//   );
// }
