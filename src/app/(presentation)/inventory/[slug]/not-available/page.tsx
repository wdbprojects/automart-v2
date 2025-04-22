import EndButtons from "@/components/shared/end-buttons";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { CarIcon, HomeIcon, XCircle } from "lucide-react";
import Link from "next/link";

const NotAvailablePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] w-full">
      <div className="w-full max-w-lg bg-card rounded-lg shadow-lg">
        <h1 className="bg-primary text-primary-foreground font-semibold text-lg rounded-t-lg p-4">
          Vehicle not available
        </h1>
      </div>
      <div className="flex flex-col items-center p-8 space-y-4">
        <XCircle className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-semibold text-center">
          Sorry, this vehicle is not available.
        </p>
        <p className="text-center text-muted-foreground max-w-[600px]">
          We have a large number of other vehicles that might suit your needs.
          To view our current stock please check our website
        </p>
        <EndButtons />
      </div>
    </div>
  );
};

export default NotAvailablePage;
