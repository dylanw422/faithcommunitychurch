"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Faith Community Church",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Beliefs",
          url: "/beliefs",
        },
        {
          title: "Tithe",
          url: "https://tithe.ly/give_new/www/#/tithely/give-one-time/7549136",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className="outline-none" variant="sidebar" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div className="flex items-center justify-end h-12 w-full p-4">
                  {/* <h1 className="font-bold text-xl">{item.title}</h1> */}
                  <ChevronLeft onClick={toggleSidebar} className="hover:cursor-pointer w-5 h-5" />
                </div>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 space-y-4">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem onClick={toggleSidebar} key={item.title}>
                        <Link href={item.url}>
                          <h1 className="text-3xl">{item.title}</h1>
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
