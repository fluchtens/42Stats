import { TabsTrigger } from "@/components/ui/tabs";

interface RncpTabTriggerProps {
  value: string;
  rncp: string;
  title: string;
}

export const RncpTabTrigger = ({ value, rncp, title }: RncpTabTriggerProps) => (
  <TabsTrigger value={value} className="flex flex-col items-center rounded-lg border bg-card data-[state=active]:bg-muted shadow">
    <span className="text-base font-medium">{rncp}</span>
    <span className="text-sm font-light">{title}</span>
  </TabsTrigger>
);
