import { ClassifiedFilterSchema } from "@/app/schemas/classified.schema";
import { AwaitedPageProps } from "@/config/types";
import {
  BodyType,
  ClassifiedStatus,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
} from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatPriceArgs {
  price: number | null;
  currency: CurrencyCode | string;
}
export const formatPrice = ({ price, currency }: FormatPriceArgs) => {
  if (!price) return "0";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    ...(currency && { currency }),
    maximumFractionDigits: 0,
  });
  return formatter.format(price / 100);
};

export const formatNumber = (
  num: number | null,
  options?: Intl.NumberFormatOptions,
) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", options).format(num);
};

export const formatOdoUnit = (unit: OdoUnit) => {
  if (!unit) return "";
  return unit === OdoUnit.MILES ? "km" : "mi";
};

export const formatTransmission = (transmission: Transmission) => {
  if (!transmission) return "";
  return transmission === Transmission.MANUAL ? "Manual" : "Automatic";
};

export const formatFuelType = (fuelType: FuelType) => {
  switch (fuelType) {
    case FuelType.PETROL:
      return "Petrol";
    case FuelType.DIESEL:
      return "Diesel";
    case FuelType.ELECTRIC:
      return "Electric";
    case FuelType.HYBRID:
      return "Hybrid";
    default:
      return "Unknown";
  }
};

export const formatBodyType = (bodyType: BodyType) => {
  switch (bodyType) {
    case BodyType.CONVERTIBLE:
      return "Convertible";
    case BodyType.COUPE:
      return "Coupe";
    case BodyType.HATCHBACK:
      return "Hatchback";
    case BodyType.SUV:
      return "SUV";
    case BodyType.WAGON:
      return "Wagon";
    case BodyType.SEDAN:
      return "Sedan";
    default:
      return "Unknown";
  }
};

export const formatColor = (color: Color) => {
  if (!color) return "Unknown";
  return color
    .toLowerCase()
    .split("")
    .toSpliced(0, 1, color[0].toUpperCase())
    .join("");
};

export const buildClassifiedFilterQuery = (
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
