import { Session } from "@/types/models/Session";
import { ApiRes, fetchAPI } from "./CoreService";

export async function getSessions(): Promise<Session[] | null> {
  try {
    const data = await fetchAPI<Session[]>("/session/all", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteSession(id: string): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>(`/session/${id}`, {
      method: "DELETE",
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
