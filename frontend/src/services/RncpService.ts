import { Rncp } from "@/types/rncp/Rncp";
import { fetchAPI } from "./CoreService";

export async function getRncp(): Promise<Rncp | null> {
  try {
    const data = await fetchAPI<Rncp>("/rncp", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}
