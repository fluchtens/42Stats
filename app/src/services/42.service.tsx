import { Campus } from "@prisma/client";

const API_URL = "https://api.intra.42.fr";

export async function getFortyTwoTokenApi() {
  try {
    const response = await fetch(API_URL + "/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id:
          "u-s4t2ud-1bf3f54d118b8dd7945782afe2fd2e7058c7e17f4f51a12230a433b071054ac2",
        client_secret:
          "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",
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to retrieve API access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("getFortyTwoTokenApi()", error);
    return null;
  }
}

export async function getCampusApi(
  page: number,
  perPage: number
): Promise<Campus[] | null> {
  try {
    const token = await getFortyTwoTokenApi();
    const response = await fetch(
      `${API_URL}/v2/campus?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Unable to retrieve campus list");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getCampusApi()", error);
    return null;
  }
}
