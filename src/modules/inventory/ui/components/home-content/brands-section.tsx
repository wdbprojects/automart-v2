import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { ClassifiedStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const BrandsSection = async () => {
  const brands = await prisma.make.findMany({
    where: {
      name: {
        in: [
          "Land Rover",
          "Aston Martin",
          "BMW",
          "Ford",
          "Audi",
          "Jaguar",
          "Porsche",
          "Mercedes-Benz",
          "Lamborghini",
          "Ferrari",
          "Bentley",
          "Volkswagen",
          "Lexus",
        ],
        mode: "insensitive",
      },
    },
  });

  const count = await prisma.classified.count({
    where: { status: ClassifiedStatus.LIVE },
  });

  return (
    <div className="!pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="px-6 lg:px-8 sm:text-center">
          <h2 className="mt-2 text-foreground text-4xl font-semibold text-center tracking-tight">
            Our Brands
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            We have {count} vehicles in stock ready for same-day drive away
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 text-center">
          {brands.map(({ id, image, name }) => {
            return (
              <Link
                href={`${routes.inventory}?make=${id}`}
                key={id}
                className="hover:scale-110 transition-all duration-100 animate-in flex justify-center relative h-24"
              >
                <Image
                  src={image}
                  alt={name}
                  className="object-contain aspect-1/1"
                  //fill={true}
                  width={100}
                  height={100}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
