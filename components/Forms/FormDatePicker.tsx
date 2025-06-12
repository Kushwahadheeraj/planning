"use client";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

type UMDatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
};

const FormDatePicker = ({
  name,
  label,
  onChange,
}: UMDatePikerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange = (date: Date | undefined) => {
    if (date) {
      const dayjsDate = dayjs(date);
      onChange ? onChange(dayjsDate, dayjsDate.format('YYYY-MM-DD')) : null;
      setValue(name, dayjsDate);
    }
  };

  return (
    <div className="grid gap-2">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                // variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value.toDate(), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value?.toDate()}
                onSelect={handleOnChange}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default FormDatePicker;