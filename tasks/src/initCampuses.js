const getAccessToken = require("./getAccessToken");

async function getCampuses(page) {
  try {
    const url = `https://api.intra.42.fr/v2/campus?page=${page}`;
    const accessToken = await getAccessToken();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

async function initCampuses(client) {
  let campuses = [];
  let page = 1;

  while (true) {
    const data = await getCampuses(page);
    if (data && data.length) {
      campuses = [...campuses, ...data];
      page++;
    } else {
      break;
    }
  }

  const insertPromises = campuses.map(async (campus) => {
    const insert =
      'INSERT INTO "Campus"(id, name, country) VALUES($1, $2, $3) RETURNING *';
    const values = [campus.id, campus.name, campus.country];
    await client.query(insert, values);
  });

  await Promise.all(insertPromises);
}

async function deleteCampuses(client) {
  const query = 'DELETE FROM "Campus"';
  await client.query(query);
}

module.exports = {
  initCampuses,
  deleteCampuses,
};
