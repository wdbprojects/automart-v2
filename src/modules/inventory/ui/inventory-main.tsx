import {
  AwaitedPageProps,
  ClassifiedWithImages,
  Favourites,
  PageProps,
} from "@/config/types.js";
import InventoryContent from "./components/inventory-content.tsx";
import InventoryNavbar from "./components/inventory-navbar";
import InventorySidebar from "./components/inventory-sidebar";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";

const InventoryMain = async ({
  searchParams,
  classifieds,
}: {
  searchParams: PageProps;
  classifieds: ClassifiedWithImages[];
}) => {
  const count = await prisma.classified.count({ where: {} });
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);
  return (
    <div className="w-full">
      <InventoryNavbar />
      <div className="flex min-h-screen pt-[4rem]">
        <InventorySidebar minMaxValues={null} searchParams={searchParams} />
        <main className="flex-1 overflow-auto">
          <InventoryContent
            favourites={favourites}
            classifieds={classifieds}
            count={count}
            totalPages={totalPages}
          />
        </main>
      </div>
    </div>
  );
};
export default InventoryMain;
