import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PoolDate } from "@/types/utils/Date";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface PoolDateSelectorProps {
  dates: PoolDate[] | null;
  poolDate: PoolDate | null;
  setPoolDate: (date: PoolDate) => void;
}

export const PoolDateSelector = ({ dates, poolDate, setPoolDate }: PoolDateSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const sortDataByCategory = (dates: PoolDate[]) => {
    const groupedDates = dates.reduce((groups, date) => {
      const { year } = date;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(date);
      return groups;
    }, {} as { [key: string]: PoolDate[] });
    return groupedDates;
  };

  const groupedDates = dates ? sortDataByCategory(dates) : {};

  useEffect(() => {
    if (dates) {
      if (!poolDate) {
        setValue("");
      } else {
        const date = dates.find((date) => {
          return date.month === poolDate.month && date.year === poolDate.year;
        });
        if (date) {
          setValue(`${date.month}-${date.year}`);
        }
      }
    }
  }, [dates, poolDate]);

  return (
    <div className="flex flex-col gap-0.5">
      <Label>Pool date</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="mt-1 w-60 justify-between">
            {value ? value : "Select pool date..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-60">
          <Command>
            <CommandInput placeholder="Search pool date..." className="h-9" />
            <CommandEmpty>No campus found.</CommandEmpty>
            <CommandList>
              {Object.entries(groupedDates).map(([year, dates]) => (
                <CommandGroup key={year} className="py-0">
                  <p className="px-2 py-1.5 text-sm font-semibold">{year}</p>
                  {dates.map((date, index) => (
                    <CommandItem
                      key={index}
                      value={`${date.month}-${date.year}`}
                      onSelect={(currentValue) => {
                        const [month, year] = currentValue.split("-");
                        setValue(currentValue);
                        setPoolDate({ month, year });
                        setOpen(false);
                      }}
                      className="py-1.5 text-muted-foreground"
                    >
                      {date.month}
                      <CheckIcon className={cn("ml-auto h-4 w-4", value === `${date.month}-${date.year}` ? "opacity-100" : "opacity-0")} />
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
