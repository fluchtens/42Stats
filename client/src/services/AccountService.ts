import { Account } from "@/types/models/Account";
import { CampusAccountCountDTO } from "@/types/utils/CampusAccountCountDTO";
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

export async function logout(): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>("/logout", {
      method: "GET",
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteAccount(): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>("/accounts", {
      method: "DELETE",
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
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

export async function getCampusAccountCounts(): Promise<CampusAccountCountDTO[] | null> {
  try {
    const data = await fetchAPI<CampusAccountCountDTO[]>("/accounts/campus-counts", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    return null;
  }
}
