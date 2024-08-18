import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { deleteSession, getSessions } from "@/services/session.service";
import { Session } from "@/types/session.interface";
import { useEffect, useState } from "react";

export const DeviceTab = () => {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const { toast } = useToast();

  const deleteDevice = async (id: string) => {
    const data = await deleteSession(id);
    if (data.success) {
      await fetchData();
      toast({
        title: data.message,
        description: "This device no longer has access to your session",
      });
    }
  };

  const fetchData = async () => {
    const data = await getSessions();
    console.log(data);
    if (data && data.length) {
      setSessions(data);
    } else {
      setSessions(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TabsContent value="device" className="mt-4">
      <div>
        <h1 className="text-2xl font-semibold">Device management</h1>
        <h2 className="text-muted-foreground">Managing active devices and sessions</h2>
      </div>
      <Separator className="my-4" />
      <div>
        <p className="text-muted-foreground">You are currently logged in to your 42Stats account on these devices.</p>
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">IP Address</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions &&
              sessions.map((session, index) => (
                <tr key={session.session_id} className={cn(index !== sessions.length - 1 && "border-b")}>
                  <td className="py-5 text-left">{session.attributes.ip_address}</td>
                  <td className="py-5 text-right">
                    {session.current ? (
                      <span className="text-base text-muted-foreground">This device</span>
                    ) : (
                      <Button onClick={() => deleteDevice(session.primary_id)} variant="destructive">
                        Log out
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </TabsContent>
  );
};
