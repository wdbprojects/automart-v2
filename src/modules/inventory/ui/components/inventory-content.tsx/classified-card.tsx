"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import { HTMLParser } from "@/components/shared/html-parser";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import { Color, FuelType, OdoUnit, Transmission } from "@prisma/client";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
}

const formatNumber = (
  num: number | null,
  options?: Intl.NumberFormatOptions,
) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", options).format(num);
};

const formatOdoUnit = (unit: OdoUnit) => {
  if (!unit) return "";
  return unit === OdoUnit.MILES ? "km" : "mi";
};

const formatTransmission = (transmission: Transmission) => {
  if (!transmission) return "";
  return transmission === Transmission.MANUAL ? "Manual" : "Automatic";
};

const formatFuelType = (fuelType: FuelType) => {
  if (!fuelType) return "";
  return FuelType.HYBRID
    ? "Hybrid"
    : FuelType.DIESEL
    ? "Diesel"
    : FuelType.ELECTRIC
    ? "Electric"
    : "Petrol";
};

const availableColors = ["red", "blue", "yellow"];
const formatColor = (color: Color) => {
  if (!color) return "Unknown";
  return color
    .toLowerCase()
    .split("")
    .toSpliced(0, 1, color[0].toUpperCase())
    .join("");
};

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <GaugeCircle className="w-4 h-4" />,
      value: `${formatNumber(classified?.odoReading)} ${formatOdoUnit(
        classified.odoUnit,
      )}`,
    },
    {
      id: "transmission",
      icon: <Cog className="w-4 h-4" />,
      value: formatTransmission(classified?.transmission),
    },
    {
      id: "fuelType ",
      icon: <Fuel className="w-4 h-4" />,
      value: formatFuelType(classified?.fuelType),
    },
    {
      id: "color",
      icon: <Paintbrush2 className="w-4 h-4" />,
      value: formatColor(classified?.color),
    },
  ];
};

export const ClassifiedCard = (props: ClassifiedCardProps) => {
  const { classified } = props;

  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-full pt-0 pb-4 gap-2 rounded-md overflow-hidden flex flex-col justify-between space-y-2">
          <CardContent className="px-0 relative">
            <Link href={routes.singleClassified(classified.slug)}>
              <Image
                placeholder="blur"
                blurDataURL={classified.images[0]?.blurhash}
                src={classified.images[0]?.src}
                alt={classified.images[0]?.alt}
                className="object-cover w-auto h-auto"
                width={400}
                height={300}
                // fill={true}
                quality={25}
              />
            </Link>

            <div className="absolute top-2.5 right-3.5 bg-background text-foreground px-2 py-1 rounded">
              <p className="text-xs lg:text-sm font-semibold">97.446</p>
            </div>
            <div className="flex flex-col space-y-1 px-2 pt-2">
              <Link
                href={routes.singleClassified(classified.slug)}
                className="text-sm md:text-sm lg:text-base leading-5 line-clamp-1 capitalize transition-colors hover:text-primary"
              >
                {classified.title}
              </Link>
              {classified?.description && (
                <div className="text-sm leading-5 text-muted-foreground line-clamp-2 mb-2">
                  <HTMLParser html={classified.description} />
                  &nbsp;
                </div>
              )}
              <ul className="grid grid-cols-2 gap-0.5">
                {getKeyClassifiedInfo(classified)
                  .filter((item) => {
                    return item.value;
                  })
                  .map((val) => {
                    const { id, icon, value } = val;
                    return (
                      <li
                        key={id}
                        className="flex items-center gap-1.5 mb-1.5 font-normal text-xs text-muted-foreground"
                      >
                        {icon} {value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="px-2 flex flex-col sm:flex-row justify-between items-center gap-2">
            <Button
              variant="outline"
              className="cursor-pointer sm:flex-1 w-full"
              size="sm"
            >
              <Link
                href={routes.reserve(
                  classified.slug,
                  MultiStepFormEnum.WELCOME,
                )}
                className="text-xs"
              >
                Reserve
              </Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="cursor-pointer sm:flex-1 w-full"
            >
              <Link
                href={routes.singleClassified(classified.slug)}
                className="text-xs dark:not-first-of-type:text-foreground font-semibold"
              >
                View details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
