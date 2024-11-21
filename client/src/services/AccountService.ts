"use client";

import { Account } from "@/types/Account";

const API_URL = `${import.meta.env.VITE_API_URL}/accounts`;

export const getAccount = async (): Promise<Account | null> => {
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
