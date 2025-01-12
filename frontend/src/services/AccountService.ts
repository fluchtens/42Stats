import { Account } from "@/types/models/Account";
import { CampusAccountCountDTO } from "@/types/utils/CampusAccountCountDTO";
import { Registration } from "@/types/utils/Registration";
import { ApiRes, fetchAPI } from "./CoreService";

export async function getAccount(): Promise<Account | null> {
  try {
    const data = await fetchAPI<Account>("/account/session", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function deleteAccount(): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>("/account", {
      method: "DELETE",
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getAccountsCount(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/account/count", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getActiveAccountsCount(): Promise<number | null> {
  try {
    const data = await fetchAPI<number>("/account/monthly/active/count", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getMonthlyRegistrations(): Promise<Registration[] | null> {
  try {
    const data = await fetchAPI<Registration[]>("/account/monthly/registrations", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCumulativeUsers(): Promise<Registration[] | null> {
  try {
    const data = await fetchAPI<Registration[]>("/account/monthly/registrations/cumulative", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}

export async function getCampusAccountCounts(): Promise<CampusAccountCountDTO[] | null> {
  try {
    const data = await fetchAPI<CampusAccountCountDTO[]>("/account/campus/counts", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}
