"use client";

import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiStepFormComponentProps, MultiStepFormEnum } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SelectComp from "@/components/shared/select-comp";
import { Loader2 } from "lucide-react";
import { routes } from "@/config/routes";
import { generateDateOptions, generateTimeOptions } from "@/lib/utils";
import { env } from "@/env";
import { selectDateSchema, SelectDateType } from "@/app/schemas/form.schema";

const SelectDate = (props: MultiStepFormComponentProps) => {
  const { searchParams, params } = props;

  const handoverDate = (searchParams?.handoverDate as string) ?? undefined;
  const handoverTime = (searchParams?.handoverTime as string) ?? undefined;

  const form = useForm<SelectDateType>({
    resolver: zodResolver(selectDateSchema),
    defaultValues: {
      handoverDate: handoverDate
        ? decodeURIComponent(handoverDate)
        : handoverDate,
      handoverTime: handoverTime
        ? decodeURIComponent(handoverTime)
        : handoverTime,
    },
    mode: "onBlur",
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTrasition] = useTransition();

  const prevStep = () => {
    startPrevTrasition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
        const url = new URL(window.location.href);
        url.searchParams.set("step", MultiStepFormEnum.WELCOME.toString());
        router.push(url.toString());
      });
    });
  };

  const { handleSubmit, control, reset, trigger } = form;

  const onSelectDate: SubmitHandler<SelectDateType> = (data) => {
    startTransition(async () => {
      const valid = await trigger();
      if (!valid) return;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      const url = new URL(
        routes.reserve(props.classified.slug, MultiStepFormEnum.SUBMIT_DETAILS),
        env.NEXT_PUBLIC_APP_URL,
      );
      url.searchParams.set(
        "handoverDate",
        encodeURIComponent(data.handoverDate),
      );
      url.searchParams.set(
        "handoverTime",
        encodeURIComponent(data.handoverTime),
      );
      router.push(url.toString());
    });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSelectDate)}
          className="space-y-4 mx-auto border p-6 bg-background rounded-lg"
        >
          <div className="flex flex-col  items h-auto min-h-72">
            <div className="flex-1 flex flex-col gap-8">
              <div>
                <FormField
                  control={control}
                  name="handoverDate"
                  render={({ field: { ref, ...rest } }) => {
                    return (
                      <FormItem>
                        <FormLabel htmlFor="handoverDate">
                          Select a Date
                        </FormLabel>
                        <FormControl>
                          <SelectComp
                            options={generateDateOptions()}
                            {...rest}
                          />
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
                  name="handoverTime"
                  render={({ field: { ref, ...rest } }) => {
                    return (
                      <FormItem>
                        <FormLabel
                          htmlFor="handoverTime"
                          className="!mb-0 !p-0"
                        >
                          Select a Time
                        </FormLabel>
                        <FormControl>
                          <SelectComp
                            options={generateTimeOptions()}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive italic text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="mt-8 flex gap-4 justify-between items-center">
              <Button
                type="button"
                size="lg"
                disabled={isPrevPending}
                variant="outline"
                onClick={prevStep}
                className="uppercase font-bold flex gap-x-3 flex-1"
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
                className="uppercase font-bold flex gap-x-3 flex-1"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                ) : null}{" "}
                Continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SelectDate;
