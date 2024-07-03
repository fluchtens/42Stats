"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

interface NavLinkProps {
  label: string;
  link: string;
  pathname: string;
}

const NavLink = ({ label, link, pathname }: NavLinkProps) => (
  <SheetClose asChild>
    <Link
      href={link}
      className={`${pathname === link ? "text-foregound" : "text-foreground/60"} p-1 text-lg font-light hover:text-foreground/80 transition-colors`}
    >
      {label}
    </Link>
  </SheetClose>
);

export const HeaderMobileMenu = ({ pathname }: { pathname: string }) => (
  <Sheet>
    <SheetTrigger asChild className="block sm:hidden">
      <Button variant="transparent" size="icon" className="cursor-pointer" asChild>
        <svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
          <path d="M3 5H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M3 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M3 19H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetClose asChild>
        <Link className="text-xl font-semibold text-left" href="/">
          42Stats
        </Link>
      </SheetClose>
      <div className="mt-1 flex-col flex justify-start items-start gap-0">
        <NavLink label="Leaderboard" link="/leaderboard" pathname={pathname} />
        <NavLink label="Statistics" link="/stats" pathname={pathname} />
      </div>
    </SheetContent>
  </Sheet>
);
