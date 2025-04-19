import SkeletonList from "@/components/shared/skeleton-list";
import InventoryNavbar from "@/modules/inventory/ui/components/inventory-navbar";

const LoadingFavourites = () => {
  return (
    <div className="w-full">
      <InventoryNavbar />
      <div className="flex min-h-screen pt-[4rem] mt-4">
        <main className="flex-1 overflow-auto">
          <h2 className="text-lg font-semibold text-foreground flex-1 text-left mb-6 ml-4 ">
            Your Favourite Classifieds
          </h2>
          <SkeletonList />
        </main>
      </div>
    </div>
  );
};
export default LoadingFavourites;
