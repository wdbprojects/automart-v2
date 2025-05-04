import { MultiStepFormEnum } from "@/config/types";
import slug from "slug";

export const routes = {
  home: "/",
  singleClassified: (slug: string) => {
    return `/inventory/${slug}`;
  },
  reserve: (slug: string, step: MultiStepFormEnum) => {
    return `/inventory/${slug}/reserve?step=${step}`;
  },
  success: (slug: string) => {
    return `/inventory/${slug}/success`;
  },
  favourites: "/favourites",
  inventory: "/inventory",
  notAvailable: (slug: string) => {
    return `/inventory/${slug}/not-available`;
  },
};
