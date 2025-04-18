import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import HeaderSection from "@/modules/inventory/ui/components/inventory-sidebar/header-section";
import FilterSection from "@/modules/inventory/ui/components/inventory-sidebar/filter-section";
import { Prisma } from "@prisma/client";
import { NewsletterForm } from "@/components/shared/newsletter-form";

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
      <SidebarFooter className="bg-background p-4">
        <div className="flex justify-center w-full">
          <NewsletterForm />
        </div>
        <div className="px-0 py-2 bg-secondary text-sm rounded-xs text-center">
          AutoMart &copy; 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default InventorySidebar;
