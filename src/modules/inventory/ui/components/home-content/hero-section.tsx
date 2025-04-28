import { imgixLoader } from "@/lib/imgix-loader";
import HomeTaxonomyFilters from "./home-taxonomy-filters";
import { SearchButton } from "./search-button";
import { imagesSources } from "@/config/constants";
import { AwaitedPageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";
import { ClassifiedStatus } from "@prisma/client";

const HeroSection = async ({ searchParams }: AwaitedPageProps) => {
  const totalFiltersApplied = Object.keys(searchParams || {}).length;
  const isFilterApplied = totalFiltersApplied > 0;
  const classifiedCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });

  const minMaxValues = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: { year: true, price: true, odoReading: true },
    _max: { year: true, price: true, odoReading: true },
  });

  return (
    <section
      className="relative flex items-start justify-center h-auto pb-[6rem] bg-no-repeat bg-cover bg-center pt-24 px-2"
      style={{
        backgroundImage: `url(${imgixLoader({
          src: imagesSources.carLineup,
          width: 1280,
          quality: 100,
        })})`,
      }}
    >
      <div className="absolute inset-0 bg-[#020817] opacity-75"></div>
      <div className="lg:grid space-y-12 items-start relative z-10">
        <div className="px-10 lg:px-0">
          <h1 className="text-2xl text-center md:text-4xl lg:text-6xl uppercase text-white font-extrabold">
            Unbeatable deals on new <br /> & used cars
          </h1>
          <h2 className="mt-4 uppercase text-center text-base md:text-3xl lg:text-4xl text-white">
            Discover your dream car today
          </h2>
        </div>
        <div className="max-w-md w-full mx-auto p-6 bg-background rounded-xl shadow-lg">
          <div className="space-y-4 pb-4">
            <div className="space-y-2 flex flex-col w-full gap-x-4">
              <HomeTaxonomyFilters
                searchParams={searchParams}
                minMaxValues={minMaxValues}
              />
            </div>
            <SearchButton count={classifiedCount} />
            {isFilterApplied && (
              <Button asChild variant="secondary" className="w-full">
                <Link href={routes.home}>
                  Clear filters ({totalFiltersApplied})
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
