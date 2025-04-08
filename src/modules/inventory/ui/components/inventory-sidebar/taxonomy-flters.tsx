"use client";

import { useEffect, useState } from "react";
import { FilterOptions, TaxonomyFiltersProps } from "@/config/types";
import SelectComp from "@/components/shared/select-comp";
import { endpoints } from "@/config/constants";
import { api } from "@/lib/api-client";

const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props;
  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);
  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([]);

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(
        searchParams as Record<string, string>,
      )) {
        if (value) {
          params.set(key, value as string);
        }
      }
      const url = new URL(endpoints.taxonomy, window.location.href);
      url.search = params.toString();
      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());
      setMakes(data.makes);
      setModels(data.models);
      setModelVariants(data.modelVariants);
    })();
  }, [searchParams]);

  return (
    <div className="space-y-3">
      {/* //NOTE: MAKE */}
      <SelectComp
        label="Make"
        name="make"
        value={searchParams?.make as string}
        options={makes}
        onChange={handleChange}
      />
      {/* //NOTE: MODEL */}
      <SelectComp
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={models}
        onChange={handleChange}
        disabled={!models.length}
      />
      {/* //NOTE: MODEL VARIANT */}
      <SelectComp
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.modelVariant as string}
        options={modelVariants}
        onChange={handleChange}
        disabled={!modelVariants.length}
      />
    </div>
  );
};
export default TaxonomyFilters;
