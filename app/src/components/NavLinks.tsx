import Link from "next/link";

export const NavLinks = () => {
  return (
    <div className="flex gap-3 text-sm md:text-base font-medium md:font-normal">
      <Link href="/leaderboard">Leaderboard</Link>
    </div>
  );
};
