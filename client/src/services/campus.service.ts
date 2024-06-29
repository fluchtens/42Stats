const API_URL = "http://localhost:8080";

async function getCampuses(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/campuses`, {
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

export { getCampuses };
