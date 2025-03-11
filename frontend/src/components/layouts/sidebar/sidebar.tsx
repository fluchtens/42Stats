import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Route } from "../layout/Layout";

export function AppSidebar({ routes }: { routes: Route[] }) {
  const { pathname } = useLocation();

  const isActive = (url: string) => pathname === url;
  const isRouteWithSubCategories = routes.find((route) => pathname.startsWith(route.url) && route.categories);

  return (
    <Sidebar>
      <SidebarHeader className="pb-0">
        <SidebarMenuButton size="lg" asChild>
          <Link to="/">
            <div className="size-8 flex justify-center items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="font-semibold">42Stats</span>
              <span className="text-xs">Statistics for 42 students</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="p-0 m-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isRouteWithSubCategories ? (
                <>
                  {isRouteWithSubCategories.categories?.map((route) => (
                    <SidebarMenuItem key={route.title}>
                      <SidebarMenuButton size="lg" isActive={isActive(route.url)} className="px-4" asChild>
                        <Link to={route.url}>
                          <route.icon style={{ width: "1.125rem", height: "1.125rem" }} />
                          <span className="text-sm font-medium">{route.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              ) : (
                <>
                  {routes
                    .filter((route) => route.display)
                    .map((route) => (
                      <SidebarMenuItem key={route.title}>
                        <SidebarMenuButton size="lg" isActive={isActive(route.url)} className="px-4" asChild>
                          <Link to={route.url}>
                            <route.icon style={{ width: "1.125rem", height: "1.125rem" }} />
                            <span className="text-sm font-medium">{route.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
