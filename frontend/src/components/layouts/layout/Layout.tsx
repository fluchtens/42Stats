import { Home } from "@/components/pages/home/Home";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

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
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="py-6 px-4 md:px-6 flex-1">{isHomePage() ? <Home /> : <Outlet />}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
