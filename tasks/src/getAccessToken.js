async function getAccessToken() {
  try {
    const url = "https://api.intra.42.fr/oauth/token";

    const body = {
      grant_type: "client_credentials",
      client_id:
        "u-s4t2ud-1bf3f54d118b8dd7945782afe2fd2e7058c7e17f4f51a12230a433b071054ac2",
      client_secret:
        "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",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
      return getAccessToken();
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    return null;
  }
}

module.exports = getAccessToken;
