"use client";

import { FilterOptions } from "@/config/types";
import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

interface SelectType extends SelectHTMLAttributes<HTMLSelectElement> {
  options: FilterOptions<string, number>;
}

interface RangeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  minSelect: SelectType;
  maxSelect: SelectType;
}

const SelectRange = (props: RangeSelectProps) => {
  const { label = "Price", minSelect, maxSelect } = props;

  return (
    <>
      <h4 className="text-sm font-semibold text-muted-foreground">{label}</h4>
      <div className="mt-1 flex items-center gap-2 justify-between">
        <select
          className={cn(
            "disabled:!bg-gray-100 dark:disabled:!bg-slate-700 flex-1 w-full px-3 py-2 border-input border rounded-md focus:outline-hidden appearance-none pr-12 bg-no-repeat bg-right z-10 custom-select text-sm",
            "cursor-pointer",
          )}
          {...minSelect}
        >
          <option value="">Select</option>
          {minSelect.options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        <select
          className={cn(
            "disabled:!bg-gray-100 dark:disabled:!bg-slate-700 flex-1 w-full px-3 py-2 border-input border rounded-md focus:outline-hidden appearance-none pr-12 bg-no-repeat bg-right z-10 custom-select text-sm",
            "cursor-pointer",
          )}
          {...maxSelect}
        >
          <option value="">Select</option>
          {maxSelect.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
export default SelectRange;
