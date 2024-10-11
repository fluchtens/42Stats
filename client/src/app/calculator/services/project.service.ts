import { Project } from "@/types/project.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

async function getProjects(): Promise<Project[] | null> {
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

export { getProjects };
