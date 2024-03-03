import { PoolDate } from "@/types/date.interface";

export async function getPoolDates(campusId: number): Promise<PoolDate[] | null> {
  try {
    const url = `/api/date/pool?campus_id=${campusId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
