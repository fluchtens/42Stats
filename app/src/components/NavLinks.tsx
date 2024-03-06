import { auth } from "@/lib/auth";
import Link from "next/link";
import { LogoutBtn, SigninBtn } from "./AuthButtons";
import { Button } from "@/components/ui/button";

export const NavLinks = async () => {
  const session = await auth();

  return (
    <div className="flex items-center gap-1 text-sm md:text-base font-medium md:font-normal">
      <Button variant="ghost" size="default">
        <Link href="/leaderboard">Leaderboard</Link>
      </Button>
      {session?.user ? <LogoutBtn /> : <SigninBtn />}
    </div>
  );
};
