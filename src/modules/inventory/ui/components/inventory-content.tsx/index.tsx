import { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { ClassifiedCard } from "./classified-card";
import { ClassifiedsList } from "./classifieds-list";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({ include: { images: true } });
};

const InventoryContent = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();

  return (
    <div className="pt-4">
      <ClassifiedsList classifieds={classifieds} />
    </div>
  );
};
export default InventoryContent;
