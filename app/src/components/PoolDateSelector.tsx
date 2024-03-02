import { PoolDate } from "@/types/date.interface";
import { useState } from "react";

interface PoolDateSelectorProps {
  dates: PoolDate[] | null;
}

export const PoolDateSelector = ({ dates }: PoolDateSelectorProps) => {
  const [selection, setSelection] = useState<string | undefined>(undefined);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(event.target.value);
  };

  return (
    <div>
      <label>Pool date:</label>
      <select className="text-black" onChange={handleSelect}>
        <option>Choose a date</option>
        {dates &&
          dates.map((date, index) => (
            <option key={index}>
              {date.month} {date.year}
            </option>
          ))}
      </select>
    </div>
  );
};
