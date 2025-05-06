import { PrismaClient } from "@prisma/client";
import { seedTaxonomy } from "./taxonomy.seed";
import { seedClassifieds } from "./classifieds.seed";
import { seedImages } from "./images.seed";

const prisma = new PrismaClient();

const main = async () => {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  //await seedTaxonomy(prisma);
  await seedClassifieds(prisma);
  await seedImages(prisma);
};

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
