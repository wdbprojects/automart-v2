import DarkMode from "@/components/shared/dark-mode";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, MenuIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { routes } from "@/config/routes";
import { Badge } from "@/components/ui/badge";
import { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

const navLinks = [
  {
    id: 1,
    href: routes.home,
    label: "Home",
  },
  {
    id: 2,
    href: routes.inventory,
    label: "Inventory",
  },
  {
    id: 3,
    href: routes.favourites,
    label: "Favourites",
  },
];

const InventoryNavbar = async () => {
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const numberOfFavourites = favourites?.ids.length;

  return (
    <nav className="fixed top-0 left-0 right-0 items-center px-2 z-50 flex justify-between border-b bg-background h-16 py-2">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 w-full justify-between">
        {/* //NOTE: MENU & LOGO */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <SidebarTrigger className="cursor-pointer" />
          <Link
            href="/"
            className="cursor-pointer sm:flex flex-row gap-0 items-center hidden "
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="cursor-pointer"
                  variant="outline"
                  asChild
                >
                  <Link href={routes.favourites} className="relative">
                    <Heart className="w-6 h-6" />
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                    >
                      {numberOfFavourites ?? 0}
                    </Badge>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Favourites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button size="sm" className="cursor-pointer">
            Auth Button
          </Button>
        </div>
        <div className="flex-shrink-0">
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild className="cursor-pointer">
                    <Button variant="outline" size="icon" className="!p-0">
                      <MenuIcon className="!w-6 !h-6" strokeWidth={1.3} />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Main menu</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SheetContent side="right" className="w-full max-w-xs p-4">
              <SheetHeader>
                <SheetTitle>Main menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground bg-secondary/70 hover:bg-secondary/90 rounded-md px-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <SheetFooter>
                <SheetClose asChild>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
export default InventoryNavbar;
