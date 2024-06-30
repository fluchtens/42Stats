import { Campus } from "@/types/campus.interface";
import { User } from "@/types/user.interface";

const API_URL = "http://localhost:8080/campus";

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

async function getCampusUsers(id: number, page: number, pageSize: number): Promise<User[] | null> {
  try {
    const response = await fetch(`${API_URL}/${id}/users?page=${page}&pageSize=${pageSize}`, {
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

export { getCampus, getCampuses, getCampusUsers };
