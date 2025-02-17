import { CreateCredential } from "@/components/pages/admin/actions/dtos/create-credential.dto";
import { Credential } from "@/types/models/Credential";
import { ApiRes, fetchAPI } from "./CoreService";

export async function getCredentialByProvider(provider: string): Promise<Credential | null> {
  try {
    return await fetchAPI<Credential>(`/credential/${provider}`, { method: "GET" });
  } catch (error: any) {
    return null;
  }
}

export async function createCredential(createCredentialDto: CreateCredential): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>(`/credential/`, {
      method: "POST",
      body: JSON.stringify(createCredentialDto),
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCredentialClientId(id: number, clientId: string): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>(`/credential/${id}`, {
      method: "PUT",
      body: JSON.stringify({ client_id: clientId }),
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCredentialClientSecret(id: number, clientSecret: string): Promise<ApiRes> {
  try {
    const data = await fetchAPI<ApiRes>(`/credential/${id}`, {
      method: "PUT",
      body: JSON.stringify({ client_secret: clientSecret }),
    });
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
