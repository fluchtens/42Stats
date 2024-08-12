import { TabsContent } from "@/components/ui/tabs";

export const AccountTab = () => {
  return (
    <TabsContent value="account" className="mt-4">
      <h1 className="text-2xl font-semibold">Account settings</h1>
      <h2 className="text-muted-foreground">Information and security</h2>
    </TabsContent>
  );
};
