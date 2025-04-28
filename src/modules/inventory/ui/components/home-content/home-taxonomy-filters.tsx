"use client";

import { ChangeEvent } from "react";
import { AwaitedPageProps, SidebarProps } from "@/config/types";
import { parseAsString, useQueryStates } from "nuqs";
import TaxonomyFilters from "../inventory-sidebar/taxonomy-flters";
import RangeFilters from "../inventory-sidebar/range-filters";

interface HomeTaxonomyFiltersProps extends SidebarProps {}

const HomeTaxonomyFilters = ({
  searchParams,
  minMaxValues,
}: HomeTaxonomyFiltersProps) => {
  const { _min, _max } = minMaxValues;
  const [, setState] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
    },
    { shallow: false },
  );
  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case "make":
        await setState({ make: value, model: null, modelVariant: null });
        break;
      case "model":
        await setState({ model: value, modelVariant: null });
        break;
      default:
        await setState({ [name]: value });
    }
  };

  return (
    <>
      <TaxonomyFilters
        handleChange={handleChange}
        searchParams={searchParams}
      />
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
        increment={100000}
        thousandSeparator
        currency={{ currencyCode: "USD" }}
        handleChange={handleChange}
        searchParams={searchParams}
      />
    </>
  );
};

export default HomeTaxonomyFilters;
