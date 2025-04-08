import DarkMode from "@/components/shared/dark-mode";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import SubNavbar from "./sub-navbar";

const InventoryNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 items-center px-2 pr-5 z-50 flex justify-between border-b bg-background h-16 py-2">
      <div className="flex items-center gap-4 w-full justify-between">
        {/* //NOTE: MENU & LOGO */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <SidebarTrigger className="cursor-pointer" />
          <Link
            href="/"
            className="cursor-pointer flex flex-row gap-0 items-center"
          >
            <h6 className="text-xl font-extrabold text-primary tracking-tight">
              Auto
            </h6>
            <h6 className="text-xl font-extrabold text-foreground tracking-tight">
              Mart
            </h6>
          </Link>
        </div>
        {/* //NOTE: SEARCHBAR */}
        <div className="flex-1 hidden md:flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>
        {/* //NOTE: AUTH */}
        <div className="flex flex-shrink-0 items-center gap-4">
          <DarkMode />
          <Button size="sm" className="cursor-pointer">
            Auth Button
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default InventoryNavbar;
