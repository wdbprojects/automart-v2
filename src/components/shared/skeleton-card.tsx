import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="w-full pt-0 pb-4 gap-2 rounded-md overflow-hidden flex flex-col justify-between space-y-1">
      <Skeleton className="h-[180px] w-auto rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-auto"></Skeleton>
        <Skeleton className="h-8 w-auto"></Skeleton>
      </div>
    </div>
  );
};
export default SkeletonCard;
