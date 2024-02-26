import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";

function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="">
      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="date" className="text-sm font-semibold">
            Date of Birth
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal h-9",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                id="date"
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button className="self-end h-9">Save</Button>
      </div>
    </div>
  );
}

export default DatePicker;
