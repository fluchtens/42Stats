"use server";

import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const GithubBtn = async () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="https://github.com/fluchtens/42Stats" target="_blank">
        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
      </Link>
    </Button>
  );
};
