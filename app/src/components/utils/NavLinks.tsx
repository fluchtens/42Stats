"use server";

import { auth } from "@/lib/auth";
import { LogoutBtn, SigninBtn } from "./AuthButtons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavLinks = async () => {
  const session = await auth();

  return (
    <div className="flex items-center gap-1 text-sm md:text-base font-medium md:font-normal">
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage
                src={`${session.user.image ? session.user.image : "noavatar"}`}
                className="object-cover pointer-events-none"
              />
              {session.user.name ? (
                <AvatarFallback>{session.user.name[0].toUpperCase()}</AvatarFallback>
              ) : (
                <AvatarFallback>U</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SigninBtn />
      )}
    </div>
  );
};
