import { AuthContext, AuthContextProps } from "@/components/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = (): AuthContextProps => useContext(AuthContext);
