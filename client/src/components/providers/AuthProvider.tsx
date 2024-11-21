import { getAccount } from "@/services/AccountService";
import { Account } from "@/types/Account";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextProps {
  user: Account | null | undefined;
  updateUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Account | null | undefined>(undefined);

  const updateUser = async () => {
    const data = await getAccount();
    if (!data) {
      setUser(null);
    } else {
      setUser(data);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return <AuthContext.Provider value={{ user, updateUser }}>{children}</AuthContext.Provider>;
};
