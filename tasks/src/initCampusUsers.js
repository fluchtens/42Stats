const getAccessToken = require("./getAccessToken");

async function getCampusUsers(accessToken, campusId, page) {
  try {
    const url = `https://api.intra.42.fr/v2/cursus_users?filter[cursus_id]=21&filter[campus_id]=${campusId}&page[number]=${page}&page[size]=100`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
      return getCampusUsers(accessToken, page);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[USER]", error);
    return null;
  }
}

async function insertUsers(client, users, campusId) {
  const insertPromises = users.map(async (user) => {
    const checkQuery = 'SELECT id FROM "FortyTwoUser" WHERE id = $1';
    const checkValues = [user.user.id];
    const checkResult = await client.query(checkQuery, checkValues);
    if (checkResult.rows.length === 0) {
      const insertQuery =
        'INSERT INTO "FortyTwoUser"(id, email, login, first_name, last_name, image, pool_month, pool_year, level, campus_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const insertValues = [
        user.user.id,
        user.user.email,
        user.user.login,
        user.user.first_name,
        user.user.last_name,
        user.user.image.link,
        user.user.pool_month,
        user.user.pool_year,
        user.level,
        campusId,
      ];
      await client.query(insertQuery, insertValues);
    }
  });
  await Promise.all(insertPromises);
  console.log("[USER] table updated.");
}

async function initCampusUsers(client, campusId) {
  console.log("[USER] init api fetching...");
  const accessToken = await getAccessToken();
  let users = [];
  let page = 1;

  while (true) {
    const data = await getCampusUsers(accessToken, campusId, page);
    if (data && data.length) {
      users = [...users, ...data];
      page++;
    } else {
      break;
    }
  }
  console.log(`[USER] ${users.length} users fetched.`);

  await insertUsers(client, users, campusId);
}

module.exports = initCampusUsers;
