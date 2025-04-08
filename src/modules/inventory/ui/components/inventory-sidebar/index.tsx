import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import HeaderSection from "@/modules/inventory/ui/components/inventory-sidebar/header-section";
import FilterSection from "@/modules/inventory/ui/components/inventory-sidebar/filter-section";
import { Prisma } from "@prisma/client";

interface InventorySidebarProps {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: { year: true; price: true; odoReading: true };
    _max: { year: true; price: true; odoReading: true };
  }>;
  searchParams: { [x: string]: string | string[] | undefined };
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
      <SidebarContent className="py-0 pb-16">
        <HeaderSection minMaxValues={null} searchParams={searchParams} />
        <SidebarSeparator className="!my-0 !py-0 h-auto" />
        <FilterSection
          minMaxValues={minMaxValues}
          searchParams={searchParams}
        />
      </SidebarContent>
    </Sidebar>
  );
};
export default InventorySidebar;
