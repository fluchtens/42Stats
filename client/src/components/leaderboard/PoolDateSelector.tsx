import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PoolDate } from "@/types/date.interface";

interface PoolDateSelectorProps {
  dates: PoolDate[] | null;
  setPoolDate: (date: PoolDate) => void;
}

export const PoolDateSelector = ({ dates, setPoolDate }: PoolDateSelectorProps) => {
  const handleSelect = (date: string) => {
    const [month, year] = date.split("-");
    setPoolDate({ month, year });
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="mt-1 w-60">
        <SelectValue placeholder="Pool date" />
      </SelectTrigger>
      <SelectContent>
        {dates &&
          dates.map((date, index) => (
            <SelectItem key={index} value={`${date.month}-${date.year}`}>
              {date.month} {date.year}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
