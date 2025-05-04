import type { PropsWithChildren } from "react";
import { InventoryLayout } from "@/modules/inventory/layouts/inventory-layout";

const PresentationLayout = (props: PropsWithChildren) => {
  return <InventoryLayout>{props.children}</InventoryLayout>;
};
export default PresentationLayout;
