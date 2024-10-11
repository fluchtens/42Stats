import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Session } from "@/types/session.interface";
import { useEffect, useState } from "react";
import { deleteSession, getSessions } from "../services/device.service.ts";

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
        <p className="text-sm font-medium text-muted-foreground">You are currently logged in to your 42Stats account on these devices.</p>
        <table className="mt-1 w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">Device</th>
              <th className="hidden sm:table-cell py-3 text-center">Creation date</th>
              <th className="hidden sm:table-cell py-3 text-center">Expiry date</th>
              {/* <th className="py-3 text-center">IP address</th> */}
              <th className="py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions &&
              sessions.map((session, index) => (
                <tr key={session.session_id} className={cn(index !== sessions.length - 1 && "border-b w-full")}>
                  <td className="py-5 flex flex-col text-sm text-left">
                    <span>{session.attributes.browser}</span>
                    <span>{session.attributes.os}</span>
                    <span>{session.attributes.device}</span>
                  </td>
                  <td className="hidden sm:table-cell text-sm text-center">{session.creation_date}</td>
                  <td className="hidden sm:table-cell text-sm text-center">{session.expiry_date}</td>
                  {/* <td className="py-5 text-sm text-center">{session.attributes.ip}</td> */}
                  <td className="py-5 text-sm text-right">
                    {session.current ? (
                      <span className="text-sm font-medium text-muted-foreground">
                        <i>This device</i>
                      </span>
                    ) : (
                      <Button onClick={() => deleteDevice(session.primary_id)} variant="destructive" size="sm">
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
