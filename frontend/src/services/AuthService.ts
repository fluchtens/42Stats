import { ApiRes, fetchAPI } from "./CoreService";

export async function logout(): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>("/auth/logout", {
      method: "POST",
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
