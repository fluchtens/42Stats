import { Campus } from "@/types/campus.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

async function getCampuses(): Promise<Campus[] | null> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

const getCampusCount = async (): Promise<Promise<number | null>> => {
  try {
    const response = await fetch(`${API_URL}/campuses/count`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const getUsersCount = async (): Promise<Promise<number | null>> => {
  try {
    const response = await fetch(`${API_URL}/users/count`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const getUsersAverageLevel = async (): Promise<Promise<number | null>> => {
  try {
    const response = await fetch(`${API_URL}/users/levels/average`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export { getCampusCount, getCampuses, getUsersAverageLevel, getUsersCount };
