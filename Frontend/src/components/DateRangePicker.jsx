/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, startOfYear, endOfYear } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "../lib/utils";

export function DateRangePicker({
  className,
  selectedRange,
  onChangeRange,
  calendarStart = startOfYear(new Date()),
  calendarEnd = endOfYear(new Date()),
}) {
  const renderDateText = () => {
    if (selectedRange?.from) {
      if (selectedRange.to) {
        return (
          <>
            {format(selectedRange.from, "LLL dd, y")} - {format(selectedRange.to, "LLL dd, y")}
          </>
        );
      }
      return format(selectedRange.from, "LLL dd, y");
    }
    return <span>Pick a date</span>;
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full md:w-[260px] justify-start text-left font-normal",
              !selectedRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {renderDateText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={onChangeRange}
            numberOfMonths={2}
            disabled={{ before: calendarStart, after: calendarEnd }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}