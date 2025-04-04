import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import InventoryMain from "@/modules/inventory/ui/inventory-main";
import { z } from "zod";

const PageSchema = z
  .string()
  .transform((val) => {
    return Math.max(Number(val), 1);
  })
  .optional();

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);
  // NOTE: get the current page
  const page = validPage ? validPage : 1;
  // NOTE: calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  return prisma.classified.findMany({
    where: {},
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

const InventoryPage = async (props: AwaitedPageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);

  return (
    <InventoryMain
      searchParams={searchParams ?? {}}
      classifieds={classifieds}
    />
  );
};
export default InventoryPage;
