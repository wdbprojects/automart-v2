"use client";

import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <div>
      <h1 className="text-primary font-semibold text-2xl">Welcome Home</h1>
      <Button
        variant="default"
        className="cursor-pointer"
        onClick={() => {
          toast.info("Welcome to love and money");
        }}
      >
        Add Money
      </Button>
      <DarkMode />
    </div>
  );
}
