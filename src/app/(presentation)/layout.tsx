import { InventoryLayout } from "@/modules/inventory/ui/layouts/inventory-layout";
import type { PropsWithChildren } from "react";

const PresentationLayout = (props: PropsWithChildren) => {
  return <InventoryLayout>{props.children}</InventoryLayout>;
};
export default PresentationLayout;
