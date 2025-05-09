"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CardWrapper from "../components/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import FormButtons from "@/components/shared/form-buttons";
import DialogSuccess from "@/components/shared/dialog-success";
import DialogError from "@/components/shared/dialog-error";
import { signInAction } from "@/app/_actions/sign-in";

const SignInForm = () => {
  const [state, formAction] = useActionState(signInAction, {
    success: false,
    message: "",
  });

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { control, reset } = form;

  useEffect(() => {
    if (state?.success && formRef.current) {
      router.refresh();
      // router.push("/auth/challenge");
    }
  }, [state, router]);

  return (
    <CardWrapper
      headerLabel="Admin Login"
      backButtonLabel="Don't have an account? Register..."
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form ref={formRef} action={formAction} className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="mb-1">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive italic text-xs" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="mb-1">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password"
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive italic text-xs" />
                  <div className="flex justify-end !m-0 !p-0">
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="!m-0 !p-0"
                    >
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                  </div>
                </FormItem>
              );
            }}
          />
          {state.success && <DialogSuccess message={state?.message} />}
          {!state.success && state.message && (
            <DialogError message={`Error! ${state.message}`} />
          )}

          <div>
            <div className="flex items-center justify-between gap-3 !mt-8">
              <FormButtons reset={reset} />
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignInForm;
