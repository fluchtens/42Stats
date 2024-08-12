import { TabsContent } from "@/components/ui/tabs";

export const DeviceTab = () => {
  return (
    <TabsContent value="device" className="mt-4">
      <h1 className="text-2xl font-semibold">Device management</h1>
      <h2 className="text-muted-foreground">Managing active devices and sessions</h2>
    </TabsContent>
  );
};
