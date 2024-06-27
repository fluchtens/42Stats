"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export const SigninBtn = () => {
  const handleButtonClick = () => {
    window.location.href = `http://localhost:8080/oauth2/authorization/42`;
  };

  return (
    <Button variant="ghost" size="default" onClick={handleButtonClick}>
      Sign in
    </Button>
  );
};

export const LogoutBtn = () => {
  return <DropdownMenuItem onClick={() => console.log("caca")}>Log out</DropdownMenuItem>;
};

export const ProfileBtn = () => {
  const { user, refreshUser } = useAuth();

  return (
    <div className="flex items-center gap-1 text-sm md:text-base font-medium md:font-normal">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage
                src={`${user.image ? user.image : "noavatar"}`}
                className="object-cover pointer-events-none"
              />
              {user.login ? (
                <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
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
