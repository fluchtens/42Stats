import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Calculator, ChartNoAxesCombined, FolderLock, Home, Medal, Settings } from "lucide-react";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";
import { AppSideBarRoutes } from "./app-sidebar-routes";

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
];

const adminRoutes = [
  {
    title: "Admin panel",
    url: "/admin",
    icon: FolderLock,
    defaultOpen: false,
    admin: true,
    children: [
      { title: "Actions", url: "/admin/actions" },
      { title: "Accounts", url: "/admin/accounts" },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <AppSidebarHeader />
          </SidebarHeader>
          <SidebarContent>
            <AppSideBarRoutes label="Menu" routes={routes} admin={false} />
            {user.is_admin && <AppSideBarRoutes label="Admin" routes={adminRoutes} admin={true} />}
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
