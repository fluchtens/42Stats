"use client";

import { Campus } from "@prisma/client";

interface CampusSelectorProps {
  campuses: Campus[] | null;
  setCampusId: (campus: number) => void;
}

export const CampusSelector = ({ campuses, setCampusId }: CampusSelectorProps) => {
  const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCampusId(Number(event.target.value));
  };

  return (
    <div className="flex-col flex">
      <label>Campus:</label>
      <select className="text-black" onChange={handleCampusChange}>
        <option>Please choose one option</option>
        {campuses &&
          campuses.map((campus, index) => (
            <option key={index} value={campus.id}>
              {campus.name} ({campus.country})
            </option>
          ))}
      </select>
    </div>
  );
};
