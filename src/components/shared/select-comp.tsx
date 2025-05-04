import { cn } from "@/lib/utils";
import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
  noDefault?: boolean;
  disabled?: boolean;
}

const SelectComp = (props: SelectProps) => {
  const {
    label,
    value,
    options,
    onChange,
    className,
    selectClassName,
    noDefault = true,
    disabled,
    ...rest
  } = props;

  return (
    <div className={cn("mt-1 flex-1 w-full", className)}>
      {label && (
        <h4 className="text-sm font-medium text-muted-foreground !mb-0">
          {label}
        </h4>
      )}
      <div className="relative">
        <select
          onChange={onChange}
          value={value ?? ""}
          disabled={disabled}
          className={cn(
            selectClassName,
            "w-full disabled:!bg-gray-100 dark:disabled:!bg-gray-700 px-3 py-2 border-input border rounded-md focus:outline-hidden appearance-none pr-12 bg-no-repeat bg-right z-10 custom-select text-sm",
            !disabled && "cursor-pointer",
          )}
          {...rest}
        >
          {noDefault && <option value="">Select...</option>}
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default SelectComp;
