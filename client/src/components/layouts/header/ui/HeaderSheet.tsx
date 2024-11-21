import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const NavLink = ({ label, link, pathname }: { label: string; link: string; pathname: string }) => (
  <SheetClose asChild>
    <Link
      to={link}
      className={`py-1.5 text-base font-light hover:text-foreground/80 transition-colors ${
        pathname === link ? "text-foregound" : "text-foreground/60"
      }`}
    >
      {label}
    </Link>
  </SheetClose>
);

export const HeaderSheet = ({ pathname }: { pathname: string }) => (
  <Sheet>
    <SheetTrigger className="flex items-center sm:hidden" asChild>
      <Button variant="ghost" size="icon" className="cursor-pointer">
        <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetClose asChild>
        <Link to="/" className="text-xl font-semibold text-left">
          <DialogTitle>42Stats</DialogTitle>
          <DialogDescription className="text-base font-light text-muted-foreground">Statistics for 42 students</DialogDescription>
        </Link>
      </SheetClose>
      <div className="mt-2 flex-col flex justify-start items-start gap-0">
        <NavLink label="Calculator" link="/calculator" pathname={pathname} />
        <NavLink label="Leaderboard" link="/leaderboard" pathname={pathname} />
        <NavLink label="Statistics" link="/stats" pathname={pathname} />
        <NavLink label="Rncp" link="/rncp" pathname={pathname} />
      </div>
    </SheetContent>
  </Sheet>
);
