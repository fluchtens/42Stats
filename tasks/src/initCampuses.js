const getAccessToken = require("./getAccessToken");
const initCampusUsers = require("./initCampusUsers");

async function getCampuses(accessToken, page) {
  try {
    const url = `https://api.intra.42.fr/v2/campus?page=${page}&?page[size]=100`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
      return getCampuses(accessToken, page);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

async function insertCampuses(client, campuses) {
  for (const campus of campuses) {
    const insert = 'INSERT INTO "Campus"(id, name, country) VALUES($1, $2, $3) RETURNING *';
    const values = [campus.id, campus.name, campus.country];
    await client.query(insert, values);
    await initCampusUsers(client, campus.id);
  }
  console.log("[CAMPUS] table updated.");
}

async function initCampuses(client) {
  console.log("[CAMPUS] init api fetching...");
  const accessToken = await getAccessToken();
  let campuses = [];
  let page = 1;

  while (true) {
    const data = await getCampuses(accessToken, page);
    if (data && data.length) {
      campuses = [...campuses, ...data];
      page++;
    } else {
      break;
    }
  }
  console.log(`[CAMPUS] ${campuses.length} campuses fetched.`);

  await insertCampuses(client, campuses);
}

module.exports = initCampuses;
