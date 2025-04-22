import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarIcon, HomeIcon } from "lucide-react";
import { routes } from "@/config/routes";

const EndButtons = () => {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <Button asChild variant="secondary" className="">
        <Link href={routes.home}>
          <HomeIcon className="mr-2 h-5 w-5" />
          <span>Go to homepage</span>
        </Link>
      </Button>
      <Button asChild variant="default" className="">
        <Link href={routes.inventory}>
          <CarIcon className="mr-2 h-5 w-5" />
          <span>Go to inventory</span>
        </Link>
      </Button>
    </div>
  );
};

export default EndButtons;
