import { User } from "@/types/models/User";
import { fetchAPI } from "./CoreService";

export async function getUsers(): Promise<User[] | null> {
  try {
    const data = await fetchAPI<User[]>("/users", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getUsersCount(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/users/count", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getUsersAverageLevel(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/users/levels/average", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampusUsers(id: number, page: number, pageSize: number): Promise<User[] | null> {
  try {
    const data = await fetchAPI<User[]>(`/users/campus/${id}?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampusPoolUsers(id: number, month: string, year: string, page: number, pageSize: number): Promise<User[] | null> {
  try {
    const data = await fetchAPI<User[]>(`/users/campus/${id}?poolMonth=${month}&poolYear=${year}&page=${page}&pageSize=${pageSize}`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampusPoolUsersCount(id: number, month: string, year: string): Promise<number | null> {
  try {
    const data = await fetchAPI<number>(`/users/campus/${id}/count?poolMonth=${month}&poolYear=${year}`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}
