"use client";

import { Account } from "@/types/models/Account";
import { Registration } from "@/types/utils/Registration";
import { ApiRes, fetchAPI } from "./CoreService";

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

export async function deleteAccount(): Promise<ApiRes | null> {
  try {
    const data = await fetchAPI<ApiRes>("/accounts", {
      method: "DELETE",
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return null;
  }
}

export async function getAccountsCount(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/accounts/count", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getActiveAccountsCount(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/accounts/active/count", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getMonthlyRegistrations(): Promise<Registration[] | null> {
  try {
    const data = await fetchAPI<Registration[]>("/accounts/monthly-registrations", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCumulativeUsers(): Promise<Registration[] | null> {
  try {
    const data = await fetchAPI<Registration[]>("/accounts/cumulative-users", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}