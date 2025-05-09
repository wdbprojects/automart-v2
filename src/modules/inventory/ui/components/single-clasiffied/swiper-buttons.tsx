import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwiperButtonProps {
  prevClassName?: string;
  nextClassName?: string;
}

const SwiperButtons = (props: SwiperButtonProps) => {
  const { prevClassName, nextClassName } = props;

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className={cn(
          prevClassName,
          "swiper-button-prev absolute top-1/2 -translate-y-1/2 flex items-center rounded-full !z-[500]",
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
        rel="prev"
      >
        <ChevronLeft className="w-8 h-8 text-foreground" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className={cn(
          nextClassName,
          "swiper-button-next absolute top-1/2 -translate-y-1/2 flex items-center rounded-full !z-[500]",
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
        rel="next"
      >
        <ChevronRight className="w-8 h-8 text-foreground" />
      </Button>
    </>
  );
};

export default SwiperButtons;
