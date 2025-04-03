import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { ClassifiedsList } from "./classifieds-list";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Pagination } from "@/components/ui/pagination";
import CustomPagination from "@/components/shared/custom-pagination";
import { routes } from "@/config/routes";
import { z } from "zod";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";

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

const InventoryContent = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="mt-1a">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-sm text-muted-foreground flex-1 border">
          {count} items found
        </h2>
        <CustomPagination
          baseURL={routes.inventory}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-end",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "border-none active:border",
            paginationLinkActive: "bg-secondary text-foreground shadow-none",
          }}
        />
      </div>
      <ClassifiedsList
        classifieds={classifieds}
        favourites={favourites ? favourites.ids : []}
      />
    </div>
  );
};
export default InventoryContent;
