"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { LoginBtn } from "./LoginBtn";
import { LogoutBtn } from "./LogoutBtn";

export const ProfileBtn = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-1 text-sm md:text-base font-medium md:font-normal">
      {user === null && <LoginBtn />}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 rounded-full">
              {user.image ? (
                <AvatarImage src={user.image} className="object-cover pointer-events-none" />
              ) : (
                <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
