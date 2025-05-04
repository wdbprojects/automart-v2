import { z } from "zod";

export const SubmitDetailsSchema = z.object({
  firstName: z.string({ message: "First name is required" }),
  lastName: z.string({ message: "Last name is required" }),
  email: z.string({ message: "Email is required" }),
  mobile: z.string({ message: "Mobile is required" }),
  terms: z.enum(["true", "false"], {
    message: "You must accept the terms and conditions",
  }),
});

export type SubmitDetailsSchemaType = z.infer<typeof SubmitDetailsSchema>;

export const CreateCustomerSchema = SubmitDetailsSchema.extend({
  date: z.date(),
  slug: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
