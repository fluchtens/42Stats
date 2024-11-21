"use client";

import { Account } from "@/types/models/Account";
import { fetchAPI } from "./CoreService";

export async function getAccount(): Promise<Account | null> {
  try {
    const data = await fetchAPI<Account>("/accounts", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function logout(): Promise<boolean> {
  try {
    await fetchAPI<Account>("/logout", {
      method: "GET",
    });
    return true;
  } catch (error: any) {
    return false;
  }
}
