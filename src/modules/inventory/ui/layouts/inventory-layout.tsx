import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import InventoryNavbar from "../components/inventory-navbar";
import InventorySidebar from "../components/inventory-sidebar";

interface InventoryLayoutProps {
  children: ReactNode;
}

export const InventoryLayout = ({ children }: InventoryLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <InventoryNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <InventorySidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
