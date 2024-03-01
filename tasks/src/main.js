const { Client } = require("pg");
const cron = require("node-cron");
const { initCampuses, deleteCampuses } = require("./initCampuses");

async function updateDatabase() {
  try {
    const connectionString = "postgresql://fluchten:19@42stats-db:5432/42stats";
    const client = new Client({ connectionString });

    await client.connect();

    await deleteCampuses(client);
    await initCampuses(client);

    await client.end();
    console.log("Database updated successfully!");
  } catch (error) {
    console.error(error);
  }
}

setTimeout(() => {
  updateDatabase();
}, 60 * 1000);

// cron.schedule("0 0 * * *", updateDatabase);
cron.schedule("*/5 * * * *", updateDatabase);
