import { ClassifiedWithImagesAndMake, MultiStepFormEnum } from "@/config/types";
import ClassifiedCarousel from "./carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdoUnit,
  formatPrice,
} from "@/lib/utils";
import { HTMLParser } from "@/components/shared/html-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";

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
            <div className="bg-slate-800 rounded-lg shadow-xs p-4 text-center">
              hello there
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClassified;
