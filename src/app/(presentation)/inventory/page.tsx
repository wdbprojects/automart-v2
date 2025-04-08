import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import InventoryMain from "@/modules/inventory/ui/inventory-main";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import { z } from "zod";

const PageSchema = z
  .string()
  .transform((val) => {
    return Math.max(Number(val), 1);
  })
  .optional();

const ClassifiedFilterSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  modelVariant: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minReading: z.string().optional(),
  maxReading: z.string().optional(),
  currency: z.string().optional(),
  odoUnit: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  color: z.string().optional(),
  doors: z.string().optional(),
  seats: z.string().optional(),
});

/* //FUNC: fetch classifieds based on filters  */

const buildClassifiedFilterQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined,
): Prisma.ClassifiedWhereInput => {
  const { data } = ClassifiedFilterSchema.safeParse(searchParams);
  if (!data) return { status: ClassifiedStatus.LIVE };
  const keys = Object.keys(data);
  const taxonomyFilters = ["make", "model", "modelVariant"];
  const rangeFilters = {
    minYear: "year",
    maxYear: "year",
    minPrice: "price",
    maxPrice: "price",
    minReading: "odoReading",
    maxReading: "odoReading",
  };

  const numFilters = ["seats", "doors"];
  const enumFilters = [
    "currency",
    "odoUnit",
    "transmission",
    "fuelType",
    "color",
  ];

  const mapParamsToFields = keys.reduce((acc, key) => {
    const value = searchParams?.[key] as string | undefined;
    if (!value) return acc;
    if (taxonomyFilters.includes(key)) {
      acc[key] = { id: Number(value) };
    } else if (enumFilters.includes(key)) {
      acc[key] = value.toUpperCase();
    } else if (numFilters.includes(key)) {
      acc[key] = Number(value);
    } else if (key in rangeFilters) {
      const field = rangeFilters[key as keyof typeof rangeFilters];
      acc[field] = acc[field] || {};
      if (key.startsWith("min")) {
        acc[field].gte = Number(value);
      } else if (key.startsWith("max")) {
        acc[field].lte = Number(value);
      }
    }
    return acc;
  }, {} as { [key: string]: any });
  return {
    status: ClassifiedStatus.LIVE,
    ...(searchParams?.q && {
      OR: [
        {
          title: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...mapParamsToFields,
  };
};

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
  const classifieds = await getInventory(searchParams);
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
