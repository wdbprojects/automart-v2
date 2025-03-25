import { imagesSources } from "@/config/constants";
import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { createPngDataUri } from "unlazy/blurhash";

export async function seedImages(prisma: PrismaClient) {
  const classifieds = await prisma.classified.findMany();

  const classifiedIds = classifieds.map((classified) => {
    return classified.id;
  });

  for (const classifiedId of classifiedIds) {
    const image: Prisma.ImageCreateInput = {
      src: imagesSources.classifiedPlaceholder,
      alt: faker.lorem.words(2),
      classified: { connect: { id: classifiedId } },
      blurhash: createPngDataUri("jPcJDYCndnZwl4h6Z2eYhWZ/c/VI"),
    };
    await prisma.image.create({
      data: image,
    });
  }
}
