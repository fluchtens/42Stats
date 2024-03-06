import Link from "next/link";
import { NavLinks } from "../NavLinks";
import { auth } from "@/lib/auth";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="px-4 py-4 border-b border-slate-200 border-opacity-10">
      <div className="max-w-screen-lg m-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg md:text-xl font-medium">42Stats</h1>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
};
