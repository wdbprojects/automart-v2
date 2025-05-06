import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface InventoryLayoutProps {
  children: ReactNode;
}

export const InventoryLayout = ({ children }: InventoryLayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
