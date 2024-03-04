async function deleteUsers(client) {
  const query = 'DELETE FROM "User"';
  await client.query(query);
  console.log("[USER] table cleaned.");
}

async function deleteCampuses(client) {
  const query = 'DELETE FROM "Campus"';
  await client.query(query);
  console.log("[CAMPUS] table cleaned.");
}

async function cleanDatabase(client) {
  await deleteUsers(client);
  await deleteCampuses(client);
}

module.exports = cleanDatabase;