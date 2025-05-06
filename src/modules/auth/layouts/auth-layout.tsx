import InventoryNavbar from "@/modules/inventory/ui/components/inventory-navbar";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div>{children}</div>;
};
