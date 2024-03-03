const getAccessToken = require("./getAccessToken");

async function getUsers(accessToken, page) {
  try {
    const url = `https://api.intra.42.fr/v2/cursus_users?filter[cursus_id]=21&filter[campus_id]=12&page[number]=${page}&page[size]=100`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
      return getUsers(accessToken, page);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[USER]", error);
    return null;
  }
}

async function insertUsers(client, users) {
  const insertPromises = users.map(async (user) => {
    const insert =
      'INSERT INTO "User"(id, email, login, first_name, last_name, image, pool_month, pool_year, level, campus_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const values = [
      user.user.id,
      user.user.email,
      user.user.login,
      user.user.first_name,
      user.user.last_name,
      user.user.image.link,
      user.user.pool_month,
      user.user.pool_year,
      user.level,
      12,
    ];
    await client.query(insert, values);
  });
  await Promise.all(insertPromises);
  console.log("[USER] table updated.");
}

async function initUsers(client) {
  console.log("[USER] init api fetching...");
  const accessToken = await getAccessToken();
  let users = [];
  let page = 1;

  while (true) {
    const data = await getUsers(accessToken, page);
    if (data && data.length) {
      users = [...users, ...data];
      page++;
    } else {
      break;
    }
  }
  console.log(`[USER] ${users.length} users fetched.`);

  await insertUsers(client, users);
}

module.exports = initUsers;
