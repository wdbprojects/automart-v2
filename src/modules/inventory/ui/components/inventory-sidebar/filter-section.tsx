"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { AwaitedPageProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { routes } from "@/config/routes";
import { env } from "@/env";
import SearchInput from "@/components/shared/search-input";
import TaxonomyFilters from "@/modules/inventory/ui/components/inventory-sidebar/taxonomy-flters";
import RangeFilters from "@/modules/inventory/ui/components/inventory-sidebar/range-filters";
import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
  // Doors,
  // Seats,
} from "@prisma/client";
import SelectComp from "@/components/shared/select-comp";
import {
  formatBodyType,
  formatColor,
  formatFuelType,
  formatOdoUnit,
  formatTransmission,
} from "@/lib/utils";
import { format } from "path";

interface SidebarProps extends AwaitedPageProps {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: { year: true; price: true; odoReading: true };
    _max: { year: true; price: true; odoReading: true };
  }>;
}

const FilterSection = ({ minMaxValues, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { _min, _max } = minMaxValues;
  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odoUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      color: parseAsString.withDefault(""),
      doors: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    },
  );

  useEffect(() => {
    const filterCount = Object.entries(
      searchParams as Record<string, string>,
    ).filter(([key, value]) => {
      return key !== "page" && value;
    }).length;
    setFilterCount(filterCount);
  }, [searchParams]);

  const clearFilters: any = () => {
    const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);
    window.location.replace(url.toString());
    setFilterCount(0);
  };

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setQueryStates({
      [name]: value || null,
    });
    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }
    router.refresh();
  };

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel className="font-semibold">
        Search by keyword
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block">
          <SearchInput placeholder="Search classifieds" className="pl-8" />
        </div>
      </SidebarGroupContent>
      <SidebarSeparator className="mt-8 mb-4" />
      <SidebarGroupLabel className="font-semibold">
        Search by taxonomy
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-0">
        <div className="px-2 block">
          <TaxonomyFilters
            handleChange={handleChange}
            searchParams={searchParams}
          />
        </div>
      </SidebarGroupContent>
      <SidebarSeparator className="mt-8 mb-4" />
      <SidebarGroupLabel className="font-semibold">
        Search by range
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block space-y-3">
          <RangeFilters
            label="Year"
            minName="minYear"
            maxName="maxYear"
            defaultMin={_min.year || 1925}
            defaultMax={_max.year || new Date().getFullYear()}
            handleChange={handleChange}
            searchParams={searchParams}
          />
          <RangeFilters
            label="Price"
            minName="minPrice"
            maxName="maxPrice"
            defaultMin={_min.price || 0}
            defaultMax={_max.price || 21474836}
            handleChange={handleChange}
            searchParams={searchParams}
            increment={100000}
            thousandSeparator
            currency={{
              currencyCode: "USD",
            }}
          />
          <RangeFilters
            label="Odometer Reading"
            minName="minReading"
            maxName="maxReading"
            defaultMin={_min.odoReading || 0}
            defaultMax={_max.odoReading || 1000000}
            handleChange={handleChange}
            searchParams={searchParams}
            increment={5000}
            thousandSeparator
          />
        </div>
      </SidebarGroupContent>
      <SidebarSeparator className="mt-8 mb-4" />
      <SidebarGroupLabel className="font-semibold">
        Search by other filters
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block space-y-3">
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectComp
              label="Currency"
              name="currency"
              value={queryStates.currency || ""}
              onChange={handleChange}
              options={Object.values(CurrencyCode).map((value) => {
                return { label: value, value: value };
              })}
            />
            <SelectComp
              label="Odomoter Unit"
              name="odoUnit"
              value={queryStates.odoUnit || ""}
              onChange={handleChange}
              options={Object.values(OdoUnit).map((value) => {
                return { label: formatOdoUnit(value), value: value };
              })}
            />
          </div>
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectComp
              label="Transmission"
              name="transmission"
              value={queryStates.transmission || ""}
              onChange={handleChange}
              options={Object.values(Transmission).map((value) => {
                return { label: formatTransmission(value), value: value };
              })}
            />
            <SelectComp
              label="Fuel Type"
              name="fuelType"
              value={queryStates.fuelType || ""}
              onChange={handleChange}
              options={Object.values(FuelType).map((value) => {
                return { label: formatFuelType(value), value: value };
              })}
            />
          </div>
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectComp
              label="Body Type"
              name="bodyType"
              value={queryStates.bodyType || ""}
              onChange={handleChange}
              options={Object.values(BodyType).map((value) => {
                return { label: formatBodyType(value), value: value };
              })}
            />
            <SelectComp
              label="Color"
              name="color"
              value={queryStates.color || ""}
              onChange={handleChange}
              options={Object.values(Color).map((value) => {
                return { label: formatColor(value), value: value };
              })}
            />
          </div>
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectComp
              label="Doors"
              name="doors"
              value={queryStates.doors || ""}
              onChange={handleChange}
              options={Array.from({ length: 6 }).map((_, index) => {
                return {
                  label: Number(index + 2).toString(),
                  value: Number(index + 2).toString(),
                };
              })}
            />
            <SelectComp
              label="Seats"
              name="seats"
              value={queryStates.seats || ""}
              onChange={handleChange}
              options={Array.from({ length: 8 }).map((_, index) => {
                return {
                  label: Number(index + 2).toString(),
                  value: Number(index + 2).toString(),
                };
              })}
            />
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default FilterSection;
