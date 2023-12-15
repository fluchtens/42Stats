import { Campus, PrismaClient } from "@prisma/client";
import { getCampusApi } from "@/services/42.service";
import cron from "node-cron";

const prisma = new PrismaClient();

async function initCampus() {
  try {
    const perPage = 100;
    let page = 1;
    let allCampus: Campus[] = [];
    let campusPage = await getCampusApi(page, perPage);
    while (campusPage && campusPage.length > 0) {
      allCampus = [...allCampus, ...campusPage];
      page++;
      campusPage = await getCampusApi(page, perPage);
    }

    await prisma.campus.createMany({
      data: allCampus.map((campus) => ({
        id: campus.id,
        name: campus.name,
      })),
    });
  } catch (error) {
    console.error("initCampus()", error);
  }
}

async function initDatabase() {
  await initCampus();
}

cron.schedule("0 0 * * *", async () => {
  await initDatabase();
  console.log("Database update completed");
});
