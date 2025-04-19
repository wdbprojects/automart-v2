import SkeletonCard from "@/components/shared/skeleton-card";

const SkeletonList = () => {
  return (
    <div className="grid xs:grid-cols-2 mdlg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4 min-w-fit">
      {Array.from({ length: 8 }, (_, index) => {
        return index + 1;
      }).map((id) => {
        return <SkeletonCard key={id} />;
      })}
    </div>
  );
};

export default SkeletonList;
