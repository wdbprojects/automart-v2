import { PageSchema } from "@/app/schemas/page.schema";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import InventoryMain from "@/modules/inventory/ui/inventory-main";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import { z } from "zod";

/* //FUNC: fetch classifieds based on filters  */

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);
  // NOTE: get the current page
  const page = validPage ? validPage : 1;
  // NOTE: calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = getInventory(searchParams);
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });
  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: { year: true, price: true, odoReading: true },
    _max: { year: true, price: true, odoReading: true },
  });

  return (
    <InventoryMain
      searchParams={searchParams ?? {}}
      classifieds={classifieds}
      count={count}
      minMaxValues={minMaxResult}
    />
  );
};
export default InventoryPage;
