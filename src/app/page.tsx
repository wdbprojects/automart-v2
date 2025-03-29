"use client";

import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
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
      <Link href="/inventory">
        <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
      </Link>
      <DarkMode />
    </div>
  );
}
