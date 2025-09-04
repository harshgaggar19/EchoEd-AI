"use client";
import { usePathname } from "next/navigation";
import {
  Home,
  Inbox,
  Settings,
  Upload,
  LogOut,
  Clock,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@clerk/nextjs";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Upload", url: "/dashboard/upload", icon: Upload },
  { title: "History", url: "/dashboard/history", icon: Clock },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="h-[93vh] top-[7vh] flex flex-col">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>EchoEdu AI</SidebarGroupLabel>
          <SidebarMenu className="">
            {items.map(({ title, url, icon: Icon }) => {
              const isExactMatch = pathname === url;
              const isSubRoute =
                url !== "/dashboard" && pathname.startsWith(url);

              const isActive = isExactMatch || isSubRoute;

              return (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={url}
                      className={`flex items-center gap-2 p-2 rounded ${
                        isActive ? "bg-gray-300 text-black" : "text-gray-700"
                      }`}
                    >
                      <Icon />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarMenu className="mt-auto pl-3 mb-40">
          <SidebarMenuItem key="logout">
            <SidebarMenuButton asChild>
              <SignOutButton>
                <button className="flex items-center gap-2 p-3 rounded hover:bg-red-600 hover:text-white">
                  <LogOut />
                  Log out
                </button>
              </SignOutButton>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
