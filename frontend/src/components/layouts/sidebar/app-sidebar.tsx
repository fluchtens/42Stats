import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import { Calculator, ChartNoAxesCombined, ChevronRightIcon, FolderLock, Home, Medal, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";

const routes = [
  { title: "Home", url: "/", icon: Home },
  { title: "Calculator", url: "/calculator", icon: Calculator },
  { title: "Leaderboard", url: "/leaderboard", icon: Medal },
  {
    title: "Statistics",
    url: "/stats",
    icon: ChartNoAxesCombined,
    defaultOpen: false,
    children: [
      { title: "42", url: "/stats/42" },
      { title: "42Stats", url: "/stats/42stats" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    defaultOpen: false,
    children: [
      { title: "Account", url: "/settings/account" },
      { title: "Device management", url: "/settings/device" },
    ],
  },
  { title: "Admin panel", url: "/admin/actions", icon: FolderLock, admin: true },
];

export function AppSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {user && (
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <AppSidebarHeader />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                {routes
                  .filter((item) => !item.admin)
                  .map((item) =>
                    !item.children ? (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => navigate(item.url)}
                          className={clsx({ "bg-sidebar-accent text-sidebar-accent-foreground": location.pathname === item.url })}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <Collapsible
                        key={item.title}
                        defaultOpen={item.defaultOpen || item.children.some((subItem) => location.pathname.startsWith(subItem.url))}
                        className="group/collapsible"
                        asChild
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    onClick={() => navigate(subItem.url)}
                                    className={clsx(
                                      "cursor-pointer",
                                      location.pathname === subItem.url && "bg-sidebar-accent text-sidebar-accent-foreground"
                                    )}
                                  >
                                    <span>{subItem.title}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  )}
              </SidebarMenu>
            </SidebarGroup>
            {user.is_admin === true && (
              <SidebarGroup>
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarMenu>
                  {routes
                    .filter((item) => item.admin)
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => navigate(item.url)}
                          className={clsx({ "bg-sidebar-accent text-sidebar-accent-foreground": location.pathname === item.url })}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroup>
            )}
          </SidebarContent>
          <SidebarFooter>
            <AppSidebarFooter />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      )}
    </>
  );
}
