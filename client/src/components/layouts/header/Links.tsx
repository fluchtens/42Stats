"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  label: string;
  link: string;
  pathname: string;
}

const NavLink = ({ label, link, pathname }: NavLinkProps) => (
  <Link
    href={link}
    className={`${pathname === link ? "text-foregound" : "text-foreground/60"} p-2 text-sm font-light hover:text-foreground/80 transition-colors`}
  >
    {label}
  </Link>
);

export const Links = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-normal items-center gap-0">
      <Link href="/" className="p-2 text-lg md:text-xl font-medium">
        42Stats
      </Link>
      <NavLink label="Leaderboard" link="/leaderboard" pathname={pathname} />
      <NavLink label="Statistics" link="/stats" pathname={pathname} />
    </div>
  );
};
