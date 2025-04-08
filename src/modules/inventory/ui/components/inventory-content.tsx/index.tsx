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
    <div className="mt-1">
      <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 py-1 h-10 mb-10 md:mb-2">
        <h2 className="text-sm font-semibold text-foreground flex-1">
          {count === 0
            ? "No items found"
            : count === 1
            ? "1 item found"
            : `${count} items found`}
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
