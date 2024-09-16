"use client";

import { getAccount } from "@/services/account.service";
import { Account } from "@/types/account.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: Account | null | undefined;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  refreshUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
