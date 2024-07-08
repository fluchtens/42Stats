"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

interface NavLinkProps {
  label: string;
  link: string;
  pathname: string;
}

const NavLink = ({ label, link, pathname }: NavLinkProps) => (
  <Link
    href={link}
    className={`${pathname === link ? "text-foregound" : "text-foreground/60"} py-2 text-base font-light hover:text-foreground/80 transition-colors`}
  >
    {label}
  </Link>
);

export const Links = () => {
  const pathname = usePathname();

  return (
    <>
      <HeaderMobileMenu pathname={pathname} />
      <div className="hidden sm:flex sm:justify-normal sm:items-center sm:gap-4">
        <Link href="/" className="py-2 text-lg md:text-xl font-medium">
          42Stats
        </Link>
        <NavLink label="Leaderboard" link="/leaderboard" pathname={pathname} />
        <NavLink label="Statistics" link="/stats" pathname={pathname} />
      </div>
    </>
  );
};
