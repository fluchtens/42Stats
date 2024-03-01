"use client";

import { Campus } from "@prisma/client";
import { useState } from "react";

interface CampusSelectorProps {
  campuses: Campus[] | null;
}

export const CampusSelector = ({ campuses }: CampusSelectorProps) => {
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>(
    undefined
  );

  const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCampus(event.target.value);
  };

  return (
    <div>
      <label>Campus:</label>
      <select className="text-black" onChange={handleCampusChange}>
        <option>Please choose one option</option>
        {campuses &&
          campuses.map((campus, index) => (
            <option key={index}>
              {campus.name} ({campus.country})
            </option>
          ))}
      </select>
      {selectedCampus && <p>{selectedCampus}</p>}
    </div>
  );
};
