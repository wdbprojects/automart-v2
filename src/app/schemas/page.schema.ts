import { z } from "zod";

export const PageSchema = z
  .string()
  .transform((val) => {
    return Math.max(Number(val), 1);
  })
  .optional();
