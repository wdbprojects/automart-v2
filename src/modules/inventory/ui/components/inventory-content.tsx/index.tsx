import { ClassifiedsList } from "./classifieds-list";
import CustomPagination from "@/components/shared/custom-pagination";
import { routes } from "@/config/routes";

interface InventoryContentProps {
  classifieds: any;
  favourites: any;
  count: any;
  totalPages: number;
}

const InventoryContent = ({
  classifieds,
  favourites,
  count,
  totalPages,
}: InventoryContentProps) => {
  return (
    <div className="mt-1a">
      <div className="flex items-center justify-between px-4 py-1">
        <h2 className="text-sm font-semibold text-foreground flex-1">
          {count} items found
        </h2>
        <CustomPagination
          baseURL={routes.inventory}
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
export default InventoryContent;
