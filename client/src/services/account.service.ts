"use client";

import { User } from "@/types/user.interface";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/accounts`;

const getAccount = async (): Promise<User | null> => {
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
};

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

export { getAccount, getAccountsCount, getActiveAccountsCount };
