async function getAccessToken() {
  try {
    const url = "https://api.intra.42.fr/oauth/token";

    const body = {
      grant_type: "client_credentials",
      client_id: process.env.FORTY_TWO_UID,
      client_secret: process.env.FORTY_TWO_SECRET,
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
