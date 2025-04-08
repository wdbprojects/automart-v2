"use client";

import { ChangeEvent, InputHTMLAttributes, useCallback, useRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import debounce from "debounce";
import { cn } from "@/lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function debounceFunc<T extends (...args: any) => any>(
  func: T,
  wait: number,
  opts: { immediate: boolean },
) {
  return debounce(func, wait, opts);
}

const SearchInput = (props: SearchInputProps) => {
  const { className, ...rest } = props;
  const [q, setSearch] = useQueryState("q", { shallow: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    debounceFunc(
      (value: string) => {
        setSearch(value) || null;
      },
      1000,
      { immediate: false },
    ),
    [],
  );

  const clearSearch = () => {
    setSearch(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    handleSearch(newValue);
  };

  return (
    <form className="relative flex-1">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className={cn(className)}
        ref={inputRef}
        defaultValue=""
        type="text"
        onChange={onChangeSearch}
        {...rest}
      />
      {q && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2.5 top-1.5 h-6 w-6 cursor-pointer z-100 group rounded-full"
          onClick={clearSearch}
        >
          <XIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        </Button>
      )}
    </form>
  );
};
export default SearchInput;
