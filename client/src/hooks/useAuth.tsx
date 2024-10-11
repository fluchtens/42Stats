"use client";

import { Account } from "@/types/models/account.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const getAccount = async (): Promise<Account | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

interface AuthContextProps {
  user: Account | null | undefined;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Account | null | undefined>(undefined);

  const refreshUser = async () => {
    const fetchedUser = await getAccount();
    if (!fetchedUser) {
      setUser(null);
    } else {
      setUser(fetchedUser);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return <AuthContext.Provider value={{ user, refreshUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);
