import { TabsContent } from "@/components/ui/tabs";

interface RncpTabContentProps {
  value: string;
  children: React.ReactNode;
}

export const RncpTabContent = ({ value, children }: RncpTabContentProps) => (
  <TabsContent value={value} className="mt-3">
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">{children}</div>
  </TabsContent>
);
