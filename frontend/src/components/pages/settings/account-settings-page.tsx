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
import { convertDate } from "@/utils/convertDate";

const AccountInformation = ({ info, value }: { info: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-base font-semibold">{info}</span>
    <span className="text-base font-normal text-muted-foreground">{value}</span>
  </div>
);

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
          <div className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex flex-col gap-4">
              <AccountInformation info="ID" value={user.id.toString()} />
              <AccountInformation info="Email" value={user.email} />
              <AccountInformation info="Username" value={user.login} />
              <AccountInformation info="Level" value={user.level.toString()} />
              <AccountInformation info="Campus ID" value={user.campus_id.toString()} />
              <AccountInformation info="Created at" value={convertDate(user.created_at)} />
              <AccountInformation info="Updated at" value={convertDate(user.updated_at)} />
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
