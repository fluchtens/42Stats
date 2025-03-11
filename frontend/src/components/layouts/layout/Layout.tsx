import { HomePage } from "@/components/pages/home/home-page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Calculator, ChartNoAxesCombined, CircleUser, Home, LockKeyhole, LucideIcon, Medal, Settings } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { AppSidebar } from "../sidebar/sidebar";

interface RouteCategory {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface Route {
  title: string;
  url: string;
  display: boolean;
  icon: LucideIcon;
  categories?: RouteCategory[];
}

const routes: Route[] = [
  { title: "Home", url: "/", display: true, icon: Home },
  { title: "Calculator", url: "/calculator", display: true, icon: Calculator },
  { title: "Leaderboard", url: "/leaderboard", display: true, icon: Medal },
  { title: "Statistics", url: "/stats", display: true, icon: ChartNoAxesCombined },
  {
    title: "Settings",
    url: "/settings",
    display: false,
    icon: Settings,
    categories: [
      { title: "Account", url: "/settings/your-account", icon: CircleUser },
      { title: "Security", url: "/settings/login-and-security", icon: LockKeyhole },
    ],
  },
  // {
  //   title: t("pages.admin.title"),
  //   url: "/admin/users",
  //   display: false,
  //   icon: Settings,
  //   categories: [{ title: t("pages.admin.users.title"), url: "/admin/users", icon: CircleUser }],
  // },
];

export function Layout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isHomePage = () => {
    return pathname === "/";
  };

  const isAdminPage = () => {
    return pathname.includes("/admin");
  };

  useEffect(() => {
    if (user === null && !isHomePage()) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to access this page.",
      });
      navigate("/");
      return;
    }
    if (user && !user.roles.some((role) => role.name === "admin") && isAdminPage()) {
      toast({
        title: "Not authorized",
        description: "You are not authorized to access this page.",
      });
      navigate("/");
      return;
    }
  }, [user, pathname]);

  return (
    <SidebarProvider>
      <AppSidebar routes={routes} />
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <main className="py-6 px-4 md:px-6 flex-1">{isHomePage() ? <HomePage /> : <Outlet />}</main>
        <Footer />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
