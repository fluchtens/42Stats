import { Link, useLocation } from "react-router-dom";
import { GithubBtn } from "./ui/GithubBtn";
import { HeaderSheet } from "./ui/HeaderSheet";
import { LoginBtn } from "./ui/LoginBtn";

const NavLink = ({ label, link, pathname }: { label: string; link: string; pathname: string }) => (
  <Link
    to={link}
    className={`py-2 text-base font-light hover:text-foreground/80 transition-colors ${pathname === link ? "text-foregound" : "text-foreground/60"}`}
  >
    {label}
  </Link>
);

const NavLinks = () => {
  const { pathname } = useLocation();

  return (
    <>
      <HeaderSheet pathname={pathname} />
      <div className="hidden sm:flex sm:justify-normal sm:items-center sm:gap-3">
        <Link to="/" className="py-2 text-lg md:text-xl font-medium">
          42Stats
        </Link>
        <NavLink label="Calculator" link="/calculator" pathname={pathname} />
        <NavLink label="Leaderboard" link="/leaderboard" pathname={pathname} />
        <NavLink label="Statistics" link="/stats" pathname={pathname} />
        <NavLink label="Rncp" link="/rncp" pathname={pathname} />
      </div>
    </>
  );
};

export const Header = () => {
  return (
    <header className="px-4 py-3 border-b">
      <div className="max-w-screen-xl m-auto flex justify-between items-center">
        <NavLinks />
        <div className="flex items-center gap-1.5">
          <GithubBtn />
          {/* <ThemeToggleBtn /> */}
          {/* <UserBtn /> */}
          <LoginBtn />
        </div>
      </div>
    </header>
  );
};
