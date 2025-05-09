"use server";

import { routes } from "@/config/routes";
import { signIn } from "../../auth";
import { SignInSchema } from "../schemas/auth.schema";
import { PrevState } from "@/config/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const signInAction = async (_: PrevState, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, success, error } = SignInSchema.safeParse({
      email: email,
      password: password,
    });
    if (!success) {
      console.log(error);
      return { success: false, message: "Invalid Credentials" };
    }
    await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: true,
      redirectTo: routes.challenge,
    });
    return { success: true, message: "Sign in successful" };
  } catch (error) {
    console.log({ error });
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid Credentials" };
  }
};
