import { Campus } from "@/types/models/Campus";
import { PoolDate } from "@/types/utils/Date";
import { fetchAPI } from "./CoreService";

export async function getCampuses(): Promise<Campus[] | null> {
  try {
    const data = await fetchAPI<Campus[]>("/campus/all", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampusCount(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/campus/count", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampus(id: number): Promise<Campus | null> {
  try {
    const data = await fetchAPI<Campus>(`/campus/${id}`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampusPools(id: number): Promise<PoolDate[] | null> {
  try {
    const data = await fetchAPI<PoolDate[]>(`/campuses/${id}/pools`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}
