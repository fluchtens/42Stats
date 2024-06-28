"use client";

import { User } from "@/types/user.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

const getUserInfos = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/user/me`, {
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
    console.log(fetchedUser);
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
