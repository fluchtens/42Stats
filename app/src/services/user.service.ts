import { User } from "@prisma/client";

export async function getCampusUsers(campusId: number): Promise<User[] | null> {
  try {
    const response = await fetch(`/api/user/campus?campus_id=${campusId}`, {
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

export async function getPoolUsers(month: string, year: string): Promise<User[] | null> {
  try {
    const url = `/api/user/pool?pool_month=${month}&pool_year=${year}`;
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
