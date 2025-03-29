import { MultiStepFormEnum } from "@/config/types";

export const routes = {
  home: "/",
  singleClassified: (slug: string) => {
    return `/inventory/${slug}`;
  },
  reserve: (slug: string, step: MultiStepFormEnum) => {
    return `/inventory/${slug}/reserve?step=${step}`;
  },
};
