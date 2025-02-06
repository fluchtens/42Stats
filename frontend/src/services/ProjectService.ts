import { Project } from "@/types/models/Project";
import { fetchAPI } from "./CoreService";

export async function getProjects(): Promise<Project[] | null> {
  try {
    const data = await fetchAPI<Project[]>("/project/all", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}
