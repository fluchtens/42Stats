import { Campus } from "@/types/campus.interface";
import { PoolDate } from "@/types/date.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/campus`;

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
    const response = await fetch(`${API_URL}/count`, {
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

async function getCampus(id: number): Promise<Campus | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
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

async function getUserCampus(id: number): Promise<Campus | null> {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

async function getCampusPools(id: number): Promise<PoolDate[] | null> {
  try {
    const response = await fetch(`${API_URL}/${id}/pools`, {
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

export { getCampus, getCampusCount, getCampuses, getCampusPools, getUserCampus };
