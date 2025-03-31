import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { ClassifiedsList } from "./classifieds-list";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({ include: { images: true } });
};

const InventoryContent = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  console.log(favourites);

  return (
    <div className="pt-4">
      <ClassifiedsList
        classifieds={classifieds}
        favourites={favourites ? favourites.ids : []}
      />
    </div>
  );
};
export default InventoryContent;
