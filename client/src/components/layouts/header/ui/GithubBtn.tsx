import { Button } from "@/components/ui/button";
import config from "@/config.json";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const GithubBtn = () => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to={config.repository} target="_blank">
        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
      </Link>
    </Button>
  );
};
