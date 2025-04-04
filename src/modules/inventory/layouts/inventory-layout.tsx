import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import InventoryNavbar from "../ui/components/inventory-navbar";
import InventorySidebar from "../ui/components/inventory-sidebar";

interface InventoryLayoutProps {
  children: ReactNode;
}

export const InventoryLayout = ({ children }: InventoryLayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
