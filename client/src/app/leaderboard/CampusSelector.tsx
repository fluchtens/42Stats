import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Campus } from "@/types/campus.interface";

interface CampusSelectorProps {
  campuses: Campus[] | null;
  setCampusId: (id: number) => void;
}

export const CampusSelector = ({ campuses, setCampusId }: CampusSelectorProps) => {
  const handleSelect = (id: string) => {
    setCampusId(Number(id));
  };

  const groupCampusesByCountry = (campuses: Campus[]) => {
    const groupedCampuses = campuses.reduce((groups, campus) => {
      const { country } = campus;
      if (!groups[country]) {
        groups[country] = [];
      }
      groups[country].push(campus);
      return groups;
    }, {} as { [key: string]: Campus[] });
    return groupedCampuses;
  };

  const groupedCampuses = campuses ? groupCampusesByCountry(campuses) : {};

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="mt-1 w-60">
        <SelectValue placeholder="Campus" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedCampuses).map(([country, campuses]) => (
          <SelectGroup key={country}>
            <SelectLabel>{country}</SelectLabel>
            {campuses.map((campus) => (
              <SelectItem key={campus.id} value={campus.id.toString()}>
                {campus.name}
              </SelectItem>
            ))}
            <SelectSeparator />
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
