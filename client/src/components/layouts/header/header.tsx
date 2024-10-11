"use server";

import { GithubBtn } from "./buttons/github-btn";
import { ThemeToggleBtn } from "./buttons/theme-toggle-btn";
import { UserBtn } from "./buttons/user-btn";
import { HeaderLinks } from "./header-links";

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
