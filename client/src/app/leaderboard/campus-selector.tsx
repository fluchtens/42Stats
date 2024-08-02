import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Campus } from "@/types/campus.interface";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface CampusSelectorProps {
  campuses: Campus[] | null;
  campusId: number | null;
  setCampusId: (id: number) => void;
}

export const CampusSelector = ({ campuses, campusId, setCampusId }: CampusSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const sortDataByCategory = (campuses: Campus[]) => {
    const sortedCampuses = campuses.sort((a, b) => {
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const groupedCampuses = sortedCampuses.reduce((groups, campus) => {
      const { country } = campus;
      if (!groups[country]) {
        groups[country] = [];
      }
      groups[country].push(campus);
      return groups;
    }, {} as { [key: string]: Campus[] });
    return groupedCampuses;
  };

  const groupedCampuses = campuses ? sortDataByCategory(campuses) : {};

  useEffect(() => {
    if (campuses) {
      if (!campusId) {
        setValue("");
      } else {
        const campus = campuses.find((campus) => {
          return campus.id === campusId;
        });
        if (campus) {
          setValue(campus.name);
        }
      }
    }
  }, [campuses, campusId]);

  return (
    <div className="flex flex-col gap-0.5">
      <Label>Campus</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="mt-1 w-60 justify-between">
            {value ? value : "Select campus..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-60">
          <Command>
            <CommandInput placeholder="Search campus..." className="h-9" />
            <CommandEmpty>No campus found.</CommandEmpty>
            <CommandList>
              {Object.entries(groupedCampuses).map(([country, campuses]) => (
                <CommandGroup key={country} className="py-0">
                  <p className="px-2 py-1.5 text-sm font-semibold">{country}</p>
                  {campuses.map((campus) => (
                    <CommandItem
                      key={campus.id}
                      value={campus.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setCampusId(campus.id);
                        setOpen(false);
                      }}
                      className="py-1.5 text-muted-foreground"
                    >
                      {campus.name}
                      <CheckIcon className={cn("ml-auto h-4 w-4", value === campus.name ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
