import { Home } from "@/components/pages/home/Home";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export function Layout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const isHomePage = () => {
    return pathname === "/";
  };

  useEffect(() => {
    if (user === null && !isHomePage()) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to access this page.",
      });
      return;
    }
  }, [user, pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      {user === null && !isHomePage() && (
        <div className="m-auto max-w-screen-xl w-full">
          <Alert variant="destructive" className="mt-6 w-full">
            <AlertTitle>Not authenticated</AlertTitle>
            <AlertDescription>
              <p>You need to be authenticated to access this page.</p>
              <p>Please log in with your 42 account.</p>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <main className="py-6 px-4 md:px-6 flex-1">{isHomePage() ? <Home /> : <Outlet />}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
