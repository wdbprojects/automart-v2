"use client";

import React, { useTransition } from "react";
import {
  type MultiStepFormComponentProps,
  MultiStepFormEnum,
} from "@/config/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CircleCheckIcon,
  CreditCard,
  ListRestartIcon,
  Loader2,
  LockIcon,
} from "lucide-react";
import Image from "next/image";
import { HTMLParser } from "@/components/shared/html-parser";

export const Welcome = (props: MultiStepFormComponentProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const nextStep = () => {
    startTransition(async () => {
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

  return (
    <div className="mx-auto bg-secondary rounded-lg mt-4">
      <div className="p-6 ">
        <div className="flex gap-x-12 justify-between">
          <div className="flex-1">
            <div className="flex items-start mb-4">
              <CircleCheckIcon className="text-green-500 w-6 h-6 mr-2" />
              <p className="text-muted-foreground">
                Reserve in minutes with 2 simple steps
              </p>
            </div>
            <div className="flex items-start mb-4">
              <CircleCheckIcon className="text-green-500 w-6 h-6 mr-2" />
              <p className="text-muted-foreground">
                Arrange a handover date for your new vehicle
              </p>
            </div>
          </div>
          <div className="flex flex-1 space-x-2">
            <div className="relative w-16 h-16">
              <Image
                src={props.classified.make.image}
                alt={props.classified.make.name}
                width={100}
                height={100}
                className="aspect-1/1 object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold line-clamp-1">
                {props.classified.title}
              </h2>
              <div className="text-xs line-clamp-2">
                <HTMLParser html={props.classified.description ?? ""} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-background p-4 rounded-md mb-4">
          <div className="text-center">
            <p className="font-bold">Select Handover Date & Time</p>
            <p className="text-muted-foreground">Select Handover Date & Time</p>
          </div>
          <ArrowRightIcon className="w-6 h-6" />
          <div className="text-center">
            <p className="font-bold">Submit your details</p>
            <p className="text-muted-foreground">approx. 1 minute</p>
          </div>
        </div>
        <p className="font-bold mb-4">Ready to begin?</p>
        <div className="flex justify-around items-center">
          <div className="flex items-center flex-col justify-center space-y-2">
            <LockIcon className="w-6 h-6" />
            <p className="text-muted-foreground">SSL Secure</p>
          </div>
          <div className="flex items-center flex-col justify-center space-y-2">
            <ListRestartIcon className="w-6 h-6" />
            <p className="text-muted-foreground">Trustpilot</p>
          </div>
          <div className="flex items-center flex-col justify-center space-y-2">
            <CreditCard className="w-6 h-6" />
            <p className="text-muted-foreground">Stripe</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Button
          type="button"
          size="lg"
          disabled={isPending}
          onClick={nextStep}
          className="uppercase font-bold flex gap-x-3 w-full"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
          ) : null}{" "}
          I'm ready
        </Button>
      </div>
    </div>
  );
};
