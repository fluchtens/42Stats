import { Rncp } from "@/types/rncp/rncp.type";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/rncp`;

async function getRncp(): Promise<Rncp | null> {
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

export { getRncp };
