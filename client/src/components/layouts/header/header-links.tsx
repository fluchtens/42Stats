"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderSheet } from "./ui/header-sheet";

const NavLink = ({ label, link, pathname }: { label: string; link: string; pathname: string }) => (
  <Link
    href={link}
    className={`${pathname === link ? "text-foregound" : "text-foreground/60"} py-2 text-base font-light hover:text-foreground/80 transition-colors`}
  >
    {label}
  </Link>
);

export const HeaderLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <HeaderSheet pathname={pathname} />
      <div className="hidden sm:flex sm:justify-normal sm:items-center sm:gap-3">
        <Link href="/" className="py-2 text-lg md:text-xl font-medium">
          42Stats
        </Link>
        <NavLink label="Calculator" link="/calculator" pathname={pathname} />
        <NavLink label="Leaderboard" link="/leaderboard" pathname={pathname} />
        <NavLink label="Statistics" link="/stats" pathname={pathname} />
        {/* <NavLink label="Rncp" link="/rncp" pathname={pathname} /> */}
      </div>
    </>
  );
};
