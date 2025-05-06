import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "A valid email is required" }),
  password: z.string().min(1, "Password is required"),
});
