import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/AccountService";

export const LogoutBtn = () => {
  const { updateUser } = useAuth();

  const logoutHandler = async () => {
    const response = await logout();
    if (response) {
      await updateUser();
    }
  };

  return <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>;
};
