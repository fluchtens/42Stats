"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const SigninBtn = () => {
  return (
    <Button variant="ghost" size="default" onClick={() => signIn("42-school")}>
      Sign in
    </Button>
  );
};

export const LogoutBtn = () => {
  return (
    <Button variant="ghost" size="default" onClick={() => signOut()}>
      Log out
    </Button>
  );
};
