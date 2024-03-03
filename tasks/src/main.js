const { Client } = require("pg");
const cron = require("node-cron");
const initCampuses = require("./initCampuses");
const initUsers = require("./initUsers");
const cleanDatabase = require("./cleanDatabase");

async function updateDatabase() {
  try {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });
    await client.connect();
    await cleanDatabase(client);
    await initCampuses(client);
    await initUsers(client);
    await client.end();
    console.log("Database updated successfully!");
  } catch (error) {
    console.error(error);
  }
}

setTimeout(() => {
  updateDatabase();
}, 60 * 1000);

cron.schedule("0 0 * * *", updateDatabase);
