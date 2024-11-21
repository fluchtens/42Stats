import { Home } from "@/components/pages/home/Home";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const isHomePage = () => {
    return pathname === "/";
  };

  useEffect(() => {
    if (user === null && !isHomePage()) {
      navigate("/");
      toast({
        title: "Error",
        description: "You must be logged in to access this page.",
      });
      return;
    }
  }, [user, pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <main className="px-4 md:px-6 py-6 flex-1">{isHomePage() ? <Home /> : <Outlet />}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
