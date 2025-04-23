import { Skeleton } from "@/components/ui/skeleton";

const CarouselSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <Skeleton className="aspect-3/2">
        <div className="grid grid-cols-4 mt-2 gap-2">
          <Skeleton className="aspect-3/2" />
          <Skeleton className="aspect-3/2" />
          <Skeleton className="aspect-3/2" />
          <Skeleton className="aspect-3/2" />
        </div>
      </Skeleton>
    </div>
  );
};

export default CarouselSkeleton;
