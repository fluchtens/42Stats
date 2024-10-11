"use server";

import { HeaderLinks } from "./header-links";
import { GithubBtn } from "./ui/buttons/github-btn";
import { ThemeToggleBtn } from "./ui/buttons/theme-toggle-btn";
import { UserBtn } from "./ui/buttons/user-btn";

export const Header = async () => {
  return (
    <header className="px-4 py-3 border-b">
      <div className="max-w-screen-xl m-auto flex justify-between items-center">
        <HeaderLinks />
        <div className="flex items-center">
          <GithubBtn />
          <ThemeToggleBtn />
          <UserBtn />
        </div>
      </div>
    </header>
  );
};
