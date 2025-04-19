import CustomPagination from "@/components/shared/custom-pagination";
import { ClassifiedsList } from "../inventory-content/classifieds-list";
import { routes } from "@/config/routes";

interface FavouritesContentProps {
  classifieds: any;
  favourites: any;
  count: any;
  totalPages: number;
}

const FavouritesContent = ({
  classifieds,
  favourites,
  count,
  totalPages,
}: FavouritesContentProps) => {
  return (
    <div className="mt-1">
      <h2 className="text-lg font-semibold text-foreground flex-1 text-left mb-0 ml-4">
        Your Favourite Classifieds
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 py-1 h-10 mb-10 md:mb-2">
        <h2 className="text-sm font-semibold text-foreground flex-1">
          {count === 0
            ? "No items found"
            : count === 1
            ? "1 item found"
            : `${count} items found`}
        </h2>
        <CustomPagination
          baseURL={routes.favourites}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-end",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "border-none active:border",
            paginationLinkActive: "bg-secondary text-foreground shadow-none",
          }}
        />
      </div>

      <ClassifiedsList
        classifieds={classifieds}
        favourites={favourites ? favourites.ids : []}
      />
    </div>
  );
};

export default FavouritesContent;
