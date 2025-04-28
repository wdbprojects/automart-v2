import { Favourites } from "@/config/types";
import LatestArrivalsCarousel from "./lastest-arrivals-carousel";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { ClassifiedStatus } from "@prisma/client";

const LatestArrivalsSection = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId || "");

  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="text-foreground text-4xl font-semibold text-center tracking-tight">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favourites={favourites ? favourites.ids : []}
        />
      </div>
    </section>
  );
};

export default LatestArrivalsSection;
