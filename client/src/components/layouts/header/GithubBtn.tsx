"use server";

import { Button } from "@/components/ui/button";
import { Config } from "@/types/config.interface";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
const config: Config = require("@/config.json");

export const GithubBtn = async () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={config.repository} target="_blank">
        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
      </Link>
    </Button>
  );
};
