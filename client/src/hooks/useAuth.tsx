"use client";

import { getUserInfos } from "@/services/user.service";
import { User } from "@/types/user.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: User | null | undefined;
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
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const refreshUser = async () => {
    const fetchedUser = await getUserInfos();
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
