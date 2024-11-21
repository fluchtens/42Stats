"use client";

import { Account } from "@/types/Account";
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
