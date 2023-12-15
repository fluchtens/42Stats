"use client";

import { Campus } from "@prisma/client";
import { useEffect, useState } from "react";

interface CampusSelectorProps {
  campus: Campus[];
}

export const CampusSelector = ({ campus }: CampusSelectorProps) => {
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    if (!selectedId) return;
    const selectedCampus = campus.find((campus) => campus.id === selectedId);
    if (selectedCampus) setSelectedCampus(selectedCampus);
  };

  useEffect(() => {
    const initialCampus = campus.find((campus) => campus.id === 12);
    if (initialCampus) setSelectedCampus(initialCampus);
  }, []);

  return (
    <div>
      <label>Select a campus:</label>
      <select
        onChange={handleCampusChange}
        value={selectedCampus ? selectedCampus.id : 12}
      >
        {campus.map((campus) => (
          <option key={campus.id} value={campus.id}>
            {campus.name} ({campus.country})
          </option>
        ))}
      </select>

      {selectedCampus && (
        <div>
          <p>ID: {selectedCampus.id}</p>
          <p>Name: {selectedCampus.name}</p>
          <p>Country: {selectedCampus.country}</p>
        </div>
      )}
    </div>
  );
};
