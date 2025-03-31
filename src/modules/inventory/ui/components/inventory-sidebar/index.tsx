import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import MainSection from "./main-section";

const InventorySidebar = () => {
  return (
    <Sidebar
      className="pt-20 z-40 border-none"
      // collapsible="offcanvas"
      variant="floating"
    >
      <SidebarContent className="">
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};
export default InventorySidebar;
