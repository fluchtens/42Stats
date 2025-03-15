import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { GithubBtn } from "./ui/github-btn";
import { LoginBtn } from "./ui/login-btn";
import { ThemeToggleBtn } from "./ui/theme-btn";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="px-4 py-3 border-b">
      <div className={clsx("flex justify-between items-center", user === null && "max-w-screen-lg m-auto")}>
        {user && <SidebarTrigger />}
        {user === null && (
          <Link to="/" className="py-2 text-lg md:text-xl font-medium">
            42Stats
          </Link>
        )}
        <div className={clsx("flex items-center", user === null && "ml-auto")}>
          <GithubBtn />
          <ThemeToggleBtn />
          {user === null && <LoginBtn />}
        </div>
      </div>
    </header>
  );
};
