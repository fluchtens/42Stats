import { Campus, User } from "@prisma/client";

export async function getCampuses(): Promise<Campus[] | null> {
  try {
    const response = await fetch("/api/campus", {
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
