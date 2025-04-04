import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import FilterSection from "./filter-section";
import { PageProps } from "@/config/types";

interface InventorySidebarProps {
  minMaxValues: any;
  searchParams: any;
}

const InventorySidebar = ({
  minMaxValues,
  searchParams,
}: InventorySidebarProps) => {
  return (
    <Sidebar
      className="pt-18 z-40 border-none rounded-sm"
      // collapsible="offcanvas"
      variant="floating"
    >
      <SidebarContent className="">
        <FilterSection minMaxValues={null} searchParams={searchParams} />
      </SidebarContent>
    </Sidebar>
  );
};
export default InventorySidebar;
