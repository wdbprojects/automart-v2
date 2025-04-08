import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
} from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
