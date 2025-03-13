import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccount } from "@/services/AccountService";

export const AccountSettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const closeAccount = async () => {
    const data = await deleteAccount();
    if (data.success) {
      await updateUser();
      toast({
        title: data.message,
        description: "Your account is deleted from our database",
      });
    }
  };

  return (
    <>
      {user && (
        <div>
          <div>
            <h1 className="text-2xl font-semibold">Account settings</h1>
            <h2 className="text-muted-foreground">Information and security</h2>
          </div>
          <Separator className="my-4" />
          <p className="text-sm font-medium text-muted-foreground">You cannot modify your personal information. </p>
          <p className="text-sm font-medium text-muted-foreground">
            This information is retrieved during the OAuth2 connection with your 42 account.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-base font-semibold">ID</span>
                <span className="text-base font-normal text-muted-foreground">{user.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Email</span>
                <span className="text-base font-normal text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Username</span>
                <span className="text-base font-normal text-muted-foreground">{user.login}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Level</span>
                <span className="text-base font-normal text-muted-foreground">{user.level}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Campus ID</span>
                <span className="text-base font-normal text-muted-foreground">{user.campus_id}</span>
              </div>
            </div>
            <Avatar className="w-48 h-48 rounded-full">
              <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
              {user.image && <AvatarImage src={user.image} className="object-cover pointer-events-none" />}
            </Avatar>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mt-4" variant="destructive">
                Close my account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete your account from our database, as well as all related sessions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={closeAccount}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};
