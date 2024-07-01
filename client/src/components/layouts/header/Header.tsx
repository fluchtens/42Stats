"use server";

import { GithubBtn } from "./GithubBtn";
import { Links } from "./Links";
import { ProfileBtn } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export const Header = async () => {
  return (
    <header className="px-4 py-3 border-b">
      <div className="max-w-screen-lg m-auto flex justify-between items-center">
        <Links />
        <div className="flex items-center">
          <GithubBtn />
          <ThemeToggle />
          <ProfileBtn />
        </div>
      </div>
    </header>
  );
};
