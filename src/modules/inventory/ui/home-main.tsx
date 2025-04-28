import InventoryNavbar from "./components/inventory-navbar";
import HomeContent from "./components/home-content";
import { AwaitedPageProps } from "@/config/types";

const HomeMain = async ({ searchParams }: AwaitedPageProps) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <InventoryNavbar />
      <main className="flex-1 overflow-auto pt-[0rem] sm:pt-[4rem]">
        <HomeContent searchParams={searchParams} />
      </main>
    </div>
  );
};
export default HomeMain;
