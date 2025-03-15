import { HomePage } from "@/components/pages/home/home-page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { AppSidebar } from "../sidebar/app-sidebar";

export function Layout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isHomePage = () => {
    return pathname === "/";
  };

  const isNotSecurePage = () => {
    const routes = ["/", "/privacy-policy", "/legal-notice"];
    return routes.includes(pathname);
  };

  const isSecurePage = () => {
    return pathname.includes("/admin");
  };

  useEffect(() => {
    if (user === null && !isNotSecurePage()) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to access this page.",
      });
      navigate("/");
      return;
    }
    if (user && !user.is_admin && isSecurePage()) {
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
      <AppSidebar />
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <main className="py-6 px-4 md:px-6 flex-1">{isHomePage() ? <HomePage /> : <Outlet />}</main>
        <Footer />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
