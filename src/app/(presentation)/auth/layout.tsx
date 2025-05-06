import InventoryNavbar from "@/modules/inventory/ui/components/inventory-navbar";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="block w-full">
      <InventoryNavbar />
      {children}
    </div>
  );
};
export default AuthLayout;
