"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { LoginBtn } from "./login-btn";
import { LogoutBtn } from "./logout-btn";

export const UserBtn = () => {
  const { user } = useAuth();

  return (
    <>
      {user === null && <LoginBtn />}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="ml-1.5 w-10 h-10 rounded-full">
              <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
              {user.image && <AvatarImage src={user.image} className="object-cover pointer-events-none" />}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
