import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Campus } from "@/types/campus.interface";

interface CampusSelectorProps {
  campuses: Campus[] | null;
  setCampusId: (id: number) => void;
}

export const CampusSelector = ({ campuses, setCampusId }: CampusSelectorProps) => {
  const handleSelect = (id: string) => {
    setCampusId(Number(id));
  };

  return (
    <div className="flex-col flex">
      <span className="text-base font-medium">Campus:</span>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select a campus..." />
        </SelectTrigger>
        <SelectContent>
          {campuses &&
            campuses.map((campus, index) => (
              <SelectItem key={index} value={campus.id.toString()}>
                {campus.name} ({campus.country})
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
