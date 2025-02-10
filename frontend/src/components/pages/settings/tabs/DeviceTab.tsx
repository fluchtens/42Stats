import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { deleteSession, getSessions } from "@/services/SessionService";
import { Session } from "@/types/models/Session";
import { convertDate } from "@/utils/convertDate";
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
              <th className="hidden sm:table-cell py-3 text-center">Expiry date</th>
              {/* <th className="py-3 text-center">IP address</th> */}
              <th className="py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions &&
              sessions.map((session, index) => (
                <tr key={session.sessionId} className={cn(index !== sessions.length - 1 && "border-b w-full")}>
                  <td className="py-5 flex flex-col text-sm text-left">
                    <span>{session.data.deviceInfo.browser}</span>
                    <span>{session.data.deviceInfo.os}</span>
                    <span>{session.data.deviceInfo.device}</span>
                  </td>
                  <td className="hidden sm:table-cell text-sm text-center">{convertDate(session.data.cookie.expires)}</td>
                  {/* <td className="py-5 text-sm text-center">{session.data.deviceInfo.ip}</td> */}
                  <td className="py-5 text-sm text-right">
                    {session.current ? (
                      <span className="text-sm font-medium text-muted-foreground">
                        <i>This device</i>
                      </span>
                    ) : (
                      <Button onClick={() => deleteDevice(session.sessionId)} variant="destructive" size="sm">
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
