import { PoolDate } from "@/types/date.interface";
import { useState } from "react";

interface PoolDateSelectorProps {
  dates: PoolDate[] | null;
  setPoolDate: (date: PoolDate) => void;
}

export const PoolDateSelector = ({ dates, setPoolDate }: PoolDateSelectorProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [month, year] = event.target.value.split("-");
    setPoolDate({ month, year });
  };

  return (
    <div className="flex-col flex">
      <label>Pool date:</label>
      <select className="text-black" onChange={handleSelect}>
        <option>Choose a date</option>
        {dates &&
          dates.map((date, index) => (
            <option key={index} value={`${date.month}-${date.year}`}>
              {date.month} {date.year}
            </option>
          ))}
      </select>
    </div>
  );
};
