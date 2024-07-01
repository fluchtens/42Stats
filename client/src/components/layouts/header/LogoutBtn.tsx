"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const API_URL = "http://localhost:8080";

async function logout(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}

export const LogoutBtn = () => {
  const { user, refreshUser } = useAuth();

  const logoutHandler = async () => {
    const response = await logout();
    if (response) {
      await refreshUser();
    }
  };

  return <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>;
};
