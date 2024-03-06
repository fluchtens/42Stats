"use server";

import Link from "next/link";
import { NavLinks } from "../NavLinks";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="px-4 py-3 border-b border-slate-200 border-opacity-10">
      <div className="max-w-screen-lg m-auto flex justify-between items-center">
        <div className="flex justify-normal items-center gap-1">
          <Link href="/" className="p-2">
            <h1 className="text-lg md:text-xl font-medium">42Stats</h1>
          </Link>
          {session?.user && (
            <Link href="/leaderboard">
              <Button variant="ghost" size="default" className="text-zinc-200">
                Leaderboard
              </Button>
            </Link>
          )}
        </div>
        <NavLinks />
      </div>
    </header>
  );
};
