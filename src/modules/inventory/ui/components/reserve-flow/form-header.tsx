"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const FormHeader = () => {
  const params = useSearchParams();
  const steps = [
    { id: "1", title: "Welcome" },
    { id: "2", title: "Select Handover Date" },
    { id: "3", title: "Submit Details" },
  ];

  return (
    <div className="p-4 flex justify-between bg-secondary shadow-sm rounded-lg mt-4 w-auto md:min-w-[650px]">
      <div className="flex flex-col justify-between flex-1">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-foreground">
          {
            steps.find(({ id }) => {
              return params.get("step") === id;
            })?.title
          }
        </h1>
      </div>
      <div className="flex items-center justify-end gap-3 text-sm font-medium text-muted-foreground flex-1">
        {steps.map((step) => {
          return (
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                params.get("step") === step.id &&
                  "bg-primary text-primary-foreground",
              )}
              key={step.id}
            >
              {step.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormHeader;
