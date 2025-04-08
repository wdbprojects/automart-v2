"use client";

import { useEffect, useState } from "react";
import SelectRange from "@/components/shared/select-range";
import { FilterOptions, RangeFiltersProps } from "@/config/types";
import { formatNumber, formatPrice } from "@/lib/utils";

const RangeFilters = (props: RangeFiltersProps) => {
  const {
    label,
    minName,
    maxName,
    defaultMin,
    defaultMax,
    increment,
    thousandSeparator,
    currency,
    handleChange,
    searchParams,
  } = props;

  const getInitialState = () => {
    const state: FilterOptions<string, number> = [];
    let iterator = defaultMin - (increment ?? 1);
    do {
      if (increment) {
        iterator = iterator + increment;
      } else {
        iterator++;
      }
      if (currency) {
        state.push({
          label: formatPrice({
            price: iterator,
            currency: currency.currencyCode,
          }),
          value: iterator,
        });
      } else if (thousandSeparator) {
        state.push({ label: formatNumber(iterator), value: iterator });
      } else {
        state.push({ label: iterator.toString(), value: iterator });
      }
    } while (iterator < defaultMax);
    return state;
  };

  const initialState = getInitialState();

  const [minOptions, setMinOptions] =
    useState<FilterOptions<string, number>>(initialState);
  const [maxOptions, setMaxOptions] = useState<FilterOptions<string, number>>(
    initialState.toReversed(),
  );

  useEffect(() => {
    if (searchParams?.[minName]) {
      setMaxOptions(
        initialState.filter(({ value }) => {
          return value > Number(searchParams[minName]);
        }),
      );
    }
    if (searchParams?.[maxName]) {
      setMinOptions(
        initialState.filter(({ value }) => {
          return value < Number(searchParams[maxName]);
        }),
      );
    }
  }, [searchParams?.[minName], searchParams?.[maxName]]);

  return (
    <div>
      <SelectRange
        label={label}
        minSelect={{
          name: minName,
          value: Number(searchParams?.[minName] || ""),
          onChange: handleChange,
          options: minOptions,
        }}
        maxSelect={{
          name: maxName,
          value: Number(searchParams?.[maxName] || ""),
          onChange: handleChange,
          options: maxOptions,
        }}
      />
    </div>
  );
};
export default RangeFilters;
