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
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="mt-1 w-60">
        <SelectValue placeholder="Campus" />
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
  );
};
