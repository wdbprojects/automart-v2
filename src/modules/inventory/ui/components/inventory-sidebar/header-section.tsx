"use client";

import { useEffect, useState } from "react";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { AwaitedPageProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { routes } from "@/config/routes";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps extends AwaitedPageProps {
  minMaxValues: any;
}

const HeaderSection = ({ minMaxValues, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const [queryState, setQueryState] = useQueryStates(
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
      tranmission: parseAsString.withDefault(""),
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

  return (
    <SidebarGroup className="p-0 m-0">
      <SidebarGroupContent>
        <div className="pt-2 m-0 block">
          <div>
            <div className="text-base font-semibold flex justify-between items-center px-4">
              <span>Filters</span>
              <Button
                onClick={clearFilters}
                size="sm"
                variant="ghost"
                aria-disabled={!filterCount}
                className={cn(
                  "cursor-pointer text-sm font-medium hover:font-semibold hover:text-primary hover:no-underline disabled:cursor-not-allowed disabled:text-muted-foreground",
                )}
                disabled={!filterCount ? true : false}
              >
                Clear all {filterCount ? `(${filterCount})` : null}
              </Button>
            </div>
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default HeaderSection;
