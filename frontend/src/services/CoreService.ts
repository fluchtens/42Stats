const API_URL = import.meta.env.VITE_API_URL;

export interface ApiRes {
  success: boolean;
  message: string;
}

export async function fetchAPI<T>(endpoint: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(API_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
