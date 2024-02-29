const { Client } = require("pg");
const cron = require("node-cron");
const { initCampuses, deleteCampuses } = require("./initCampuses");

const client = new Client({
  user: "fluchten",
  password: "19",
  host: "42stats-db",
  port: "5432",
  database: "42stats",
});

async function updateDatabase() {
  try {
    if (!client._connected) {
      await client.connect();
    }

    await deleteCampuses(client);
    await initCampuses(client);

    if (client._connected) {
      await client.end();
    }
  } catch (error) {
    console.error(error);
  }
}

updateDatabase();
// cron.schedule("0 0 * * *", updateDatabase);
cron.schedule("* * * * *", updateDatabase);
