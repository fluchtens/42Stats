"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const SigninBtn = () => {
  return (
    <Button variant="ghost" size="default" onClick={() => signIn("42-school")}>
      Sign in
    </Button>
  );
};

export const LogoutBtn = () => {
  return <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>;
};

export const ProfileBtn = () => {};
