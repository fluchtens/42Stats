import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createCredential } from "@/services/CredentialService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CreateCredential, CreateCredentialSchema } from "../dtos/create-credential.dto";

interface CredentialCreatorProps {
  callback: () => Promise<void>;
}

export function CredentialCreator({ callback }: CredentialCreatorProps) {
  const { toast } = useToast();
  const [dialog, setDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDialog = () => {
    setDialog(!dialog);
    form.reset();
    setError("");
  };

  const form = useForm<CreateCredential>({
    resolver: zodResolver(CreateCredentialSchema),
    defaultValues: {
      provider: "42",
      client_id: "",
      client_secret: "",
    },
  });

  const onSubmit = async (createCredentialDto: CreateCredential) => {
    const data = await createCredential(createCredentialDto);
    if (data.success) {
      callback();
      handleDialog();
      toast({
        title: "Success",
        description: data.message,
      });
    } else {
      setError(data.message);
    }
  };

  return (
    <Dialog open={dialog} onOpenChange={handleDialog}>
      <DialogTrigger asChild>
        <Button>Configure</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure new credential</DialogTitle>
          <DialogDescription>
            Create an application on{" "}
            <Link to="https://profile.intra.42.fr/oauth/applications" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              this page
            </Link>{" "}
            and fill in the details below to configure your credential.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {error && (
              <Alert variant="destructive" className="mt-6 w-full">
                <AlertTitle>An error has occurred</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Provider</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter a provider"
                        autoComplete="on"
                        disabled
                        required
                        className={form.formState.errors.provider ? "border-destructive focus-visible:ring-destructive" : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>UID</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the UID of your application"
                        autoComplete="on"
                        required
                        className={form.formState.errors.client_id ? "border-destructive focus-visible:ring-destructive" : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client_secret"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>SECRET</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the SECRET of your application"
                        autoComplete="on"
                        required
                        className={form.formState.errors.client_secret ? "border-destructive focus-visible:ring-destructive" : ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <DialogClose asChild>
                <Button type="button" onClick={handleDialog} variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
