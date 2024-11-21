import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Project } from "@/types/models/Project";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface ProjectSelectorProps {
  projects: Project[] | null;
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
}

export const ProjectSelector = ({ projects, selectedProject, setSelectedProject }: ProjectSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!selectedProject) {
      setValue("");
    }
  }, [selectedProject]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          {value ? value : "Select a project"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <Command>
        <PopoverContent className="p-0 popover-content-width-full">
          <CommandInput placeholder="Search a project..." className="h-9" />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandList>
            {projects &&
              projects.map((project, index) => (
                <CommandItem
                  key={index}
                  value={`${project.name} (${project.difficulty} XP)`}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setSelectedProject(project);
                    setOpen(false);
                  }}
                  className="py-1.5 text-muted-foreground"
                >
                  {project.name} ({project.difficulty} XP)
                  <CheckIcon
                    className={cn("ml-auto h-4 w-4", value === `${project.name} (${project.difficulty} XP)` ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
};
