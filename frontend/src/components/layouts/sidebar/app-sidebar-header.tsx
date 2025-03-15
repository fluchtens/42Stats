import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChartColumn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AppSidebarHeader = () => {
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={() => navigate("/")}>
          <div className="flex justify-center items-center aspect-square size-8 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-sidebar-primary-foreground">
            <ChartColumn className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">42Stats</span>
            <span className="truncate text-xs">Statistics for 42 students</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
