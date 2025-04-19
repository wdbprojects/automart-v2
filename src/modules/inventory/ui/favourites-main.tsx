import { ClassifiedWithImages, Favourites } from "@/config/types.js";
import InventoryNavbar from "./components/inventory-navbar";
import InventorySidebar from "./components/inventory-sidebar";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Prisma } from "@prisma/client";
import InventoryContent from "./components/inventory-content";
import FavouritesContent from "./components/favourites-content";

const FavouritesMain = async ({
  searchParams,
  classifieds,
  count,
  minMaxValues,
}: {
  searchParams: { [x: string]: string | string[] | undefined };
  classifieds: Promise<ClassifiedWithImages[]>;
  count: number;
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: { year: true; price: true; odoReading: true };
    _max: { year: true; price: true; odoReading: true };
  }>;
}) => {
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="w-full">
      <InventoryNavbar />
      <div className="flex min-h-screen pt-[4rem]">
        {/* <InventorySidebar
          minMaxValues={minMaxValues}
          searchParams={searchParams}
        /> */}

        <main className="flex-1 overflow-auto">
          <FavouritesContent
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
export default FavouritesMain;
