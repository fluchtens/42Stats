import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AppSidebarRoutesProps {
  label: string;
  routes: any[];
  admin: boolean;
}

export function AppSideBarRoutes({ label, routes, admin }: AppSidebarRoutesProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, toggleSidebar } = useSidebar();
  const [visible, setVisible] = useState<boolean>(true);

  const changeRoute = (url: string) => {
    if (isMobile) {
      toggleSidebar();
    }
    navigate(url);
  };

  useEffect(() => {
    if (user && admin && !user.is_admin) {
      setVisible(false);
    }
  }, [user]);

  return (
    <>
      {user && visible && (
        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarMenu>
            {routes.map((item) =>
              !item.children ? (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => changeRoute(item.url)}
                    className={clsx({ "bg-sidebar-accent text-sidebar-accent-foreground": location.pathname === item.url })}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.defaultOpen || item.children.some((subItem: any) => location.pathname.startsWith(subItem.url))}
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
                        {item.children.map((subItem: any) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              onClick={() => changeRoute(subItem.url)}
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
      )}
    </>
  );
}
