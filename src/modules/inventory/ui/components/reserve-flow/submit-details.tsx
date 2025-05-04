"use client";

import { useTransition } from "react";
import { MultiStepFormComponentProps, MultiStepFormEnum } from "@/config/types";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import {
  SubmitDetailsSchema,
  SubmitDetailsSchemaType,
} from "@/app/schemas/customer.schema";
import { createCustomerAction } from "@/app/_actions/customer";
import { toast } from "sonner";
import { routes } from "@/config/routes";

const SubmitDetails = (props: MultiStepFormComponentProps) => {
  const { params, searchParams } = props;

  const form = useForm<SubmitDetailsSchemaType>({
    resolver: zodResolver(SubmitDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      terms: "false",
    },
    mode: "onBlur",
  });

  const { handleSubmit, control, reset, trigger } = form;

  const prevStep = () => {
    startPrevTrasition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
        const url = new URL(window.location.href);
        url.searchParams.set("step", MultiStepFormEnum.SELECT_DATE.toString());
        router.push(url.toString());
      });
    });
  };

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTrasition] = useTransition();

  const onSubmitDetails: SubmitHandler<SubmitDetailsSchemaType> = (data) => {
    startTransition(async () => {
      const valid = await trigger();
      if (!valid) return;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      const handoverDate = decodeURIComponent(
        searchParams?.handoverDate as string,
      );
      const handoverTime = decodeURIComponent(
        searchParams?.handoverTime as string,
      );
      const date = formatDate(handoverDate, handoverTime);
      // create customer
      const { success, message } = await createCustomerAction({
        slug: params?.slug as string,
        date: date,
        ...data,
      });
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setTimeout(() => {
        router.push(routes.success(params?.slug as string));
      }, 1000);
    });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmitDetails)}
          className="space-y-4 mx-auto border p-3 sm:p-6 bg-background rounded-lg"
        >
          <div className="flex flex-col h-auto min-h-72 justify-between">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="firstName" className="mb-1">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive italic text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="lastName" className="mb-1">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive italic text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="email" className="mb-1">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive italic text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={control}
                  name="mobile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="mobile" className="mb-1">
                          Mobile
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive italic text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="mt-2">
                <FormField
                  control={control}
                  name="terms"
                  render={({ field: { ref, onChange, ...rest } }) => {
                    return (
                      <FormItem className="flex items-center just gap-4">
                        <FormControl>
                          <Checkbox
                            id="terms"
                            {...rest}
                            onCheckedChange={(event) => {
                              onChange(event ? "true" : "false");
                            }}
                            className="hover:cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
                        >
                          Accept terms and conditions
                        </FormLabel>
                        <FormMessage className="text-destructive italic text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="mt-8 flex gap-2 sm:gap-4 justify-between items-center">
              <Button
                type="button"
                size="lg"
                disabled={isPrevPending}
                variant="outline"
                onClick={prevStep}
                className="text-xs uppercase font-bold flex gap-x-3 flex-1"
              >
                {isPrevPending ? (
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                ) : null}{" "}
                Previous Step
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="text-xs uppercase font-bold flex gap-x-3 flex-1"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                ) : null}{" "}
                Submit Details
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitDetails;
