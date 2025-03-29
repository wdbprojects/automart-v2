"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";

const items = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Subscriptions", url: "/inventory", icon: PlaySquareIcon },
  { title: "Trending", url: "/inventory", icon: FlameIcon },
];

const MainSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip={item.title}
                  asChild
                  isActive={false} // TODO: change look at current pathname
                  onClick={() => {}} // TODO: do something on click
                >
                  <Link href={item.url} className="flex items-center gap-4">
                    {<item.icon />}
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>{" "}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default MainSection;
