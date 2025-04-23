import { ClassifiedWithImagesAndMake, MultiStepFormEnum } from "@/config/types";
import ClassifiedCarousel from "./carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  formatBodyType,
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdoUnit,
  formatPrice,
  formatTransmission,
} from "@/lib/utils";
import { HTMLParser } from "@/components/shared/html-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";
import {
  Car,
  CarFront,
  Fingerprint,
  Fuel,
  Gauge,
  Power,
  User,
} from "lucide-react";

const features = (props: ClassifiedWithImagesAndMake) => {
  return [
    {
      id: 1,
      icon: <Fingerprint className="w-6 h-6 mx-auto text-muted" />,
      label: props.vrm,
    },
    {
      id: 2,
      icon: <Car className="w-6 h-6 mx-auto text-muted" />,
      label: formatBodyType(props.bodyType),
    },
    {
      id: 3,
      icon: <Fuel className="w-6 h-6 mx-auto text-muted" />,
      label: formatFuelType(props.fuelType),
    },
    {
      id: 4,
      icon: <Power className="w-6 h-6 mx-auto text-muted" />,
      label: formatTransmission(props.transmission),
    },
    {
      id: 5,
      icon: <Gauge className="w-6 h-6 mx-auto text-muted" />,
      label: `${formatNumber(props.odoReading)} ${formatOdoUnit(
        props.odoUnit,
      )}`,
    },
    {
      id: 6,
      icon: <User className="w-6 h-6 mx-auto text-muted" />,
      label: `${props.seats} seats`,
    },
    {
      id: 7,
      icon: <CarFront className="w-6 h-6 mx-auto text-muted" />,
      label: `${props.doors} doors`,
    },
  ];
};

const SingleClassified = (props: ClassifiedWithImagesAndMake) => {
  return (
    <div className="flex flex-col container mx-auto md:px-0 py-12 !px-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <ClassifiedCarousel images={props.images} />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <Image
              src={props.make.image}
              alt={props.make.name}
              width={120}
              height={120}
              className="w-20 mr-4"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                {props.title}
              </h1>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2 mb-2">
            <Badge variant="outline">{props.year}</Badge>
            <Badge variant="outline">
              {formatNumber(props.odoReading)} {formatOdoUnit(props.odoUnit)}
            </Badge>
            <Badge variant="outline">{formatColor(props.color)}</Badge>
            <Badge variant="outline">{formatFuelType(props.fuelType)}</Badge>
          </div>
          {props.description && (
            <p className="mt-4">
              <HTMLParser html={props.description} />
            </p>
          )}
          <div className="text-4xl font-medium my-4 w-full border border-muted-foreground flex  justify-center items-center rounded-xl py-12">
            Our Price:{" "}
            {formatPrice({ price: props.price, currency: props.currency })}
          </div>
          <Button
            asChild
            variant="default"
            size="lg"
            className="uppercase font-bold py-3 px-6 w-full mb-4 "
          >
            <Link href={routes.reserve(props.slug, MultiStepFormEnum.WELCOME)}>
              Reserve Now
            </Link>
          </Button>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features(props).map(({ id, icon, label }) => {
              return (
                <div
                  key={id}
                  className="w-full bg-muted-foreground rounded-lg shadow-xs p-0 text-center flex-col justify-center items-center gap-0 py-2"
                >
                  <span className=" w-full flex justify-center items-end">
                    {icon}
                  </span>
                  <p className="text-sm font-medium mt-1 text-muted">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClassified;
