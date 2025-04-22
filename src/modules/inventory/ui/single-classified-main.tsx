import { Prisma } from "@prisma/client";
import InventoryNavbar from "./components/inventory-navbar";
import SingleClassified from "./components/single-clasiffied";
import { ClassifiedWithImagesAndMake } from "@/config/types";

const SingleClassifiedMain = async (props: ClassifiedWithImagesAndMake) => {
  return (
    <div className="w-full">
      <InventoryNavbar />
      <div className="flex min-h-screen pt-[4rem]">
        <main className="flex-1 overflow-auto">
          <SingleClassified {...props} />
        </main>
      </div>
    </div>
  );
};
export default SingleClassifiedMain;
