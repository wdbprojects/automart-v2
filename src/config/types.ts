import { CurrencyCode, Prisma } from "@prisma/client";
import { ChangeEvent } from "react";

type Params = {
  [x: string]: string | string[];
};

export type PrevState = {
  success: boolean;
  message: string;
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};

export interface MultiStepFormComponentProps extends AwaitedPageProps {
  classified: Prisma.ClassifiedGetPayload<{
    include: { make: true };
  }>;
}

export type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: { images: true };
}>;

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATE = 2,
  SUBMIT_DETAILS = 3,
}

export interface SidebarProps extends AwaitedPageProps {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: { year: true; price: true; odoReading: true };
    _max: { year: true; price: true; odoReading: true };
  }>;
}

export interface Favourites {
  ids: number[];
}

export interface TaxonomyFiltersProps extends AwaitedPageProps {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
export interface RangeFiltersProps extends TaxonomyFiltersProps {
  label: string;
  minName: string;
  maxName: string;
  defaultMin: number;
  defaultMax: number;
  increment?: number;
  thousandSeparator?: boolean;
  currency?: {
    currencyCode: CurrencyCode;
  };
}

export type FilterOptions<LType, VType> = Array<{
  label: LType;
  value: VType;
}>;

export type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
  include: { images: true; make: true };
}>;
