import { Registration } from "@/types/registration.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/accounts`;

async function getAccountsCount(): Promise<Promise<number | null>> {
  try {
    const response = await fetch(`${API_URL}/count`, {
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

async function getActiveAccountsCount(): Promise<Promise<number | null>> {
  try {
    const response = await fetch(`${API_URL}/active/count`, {
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

async function getMonthlyRegistrations(): Promise<Promise<Registration[] | null>> {
  try {
    const response = await fetch(`${API_URL}/registrations`, {
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

export { getAccountsCount, getActiveAccountsCount, getMonthlyRegistrations };
