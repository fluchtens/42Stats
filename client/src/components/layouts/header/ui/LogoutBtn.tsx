import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/AccountService";

export const LogoutBtn = () => {
  const { updateUser } = useAuth();
  const { toast } = useToast();

  const logoutHandler = async () => {
    const response = await logout();
    if (response) {
      await updateUser();
      toast({
        title: "See you soon",
        description: response.message,
      });
    }
  };

  return <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>;
};
