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
import { useContext, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-hot-toast";
import { AppContext } from "@/App";
import axios from "axios";

function DatePicker() {
  const [date, setDate] = useState<Date>();
  const { userData, setUserData } = useContext(AppContext);

  // const { mutate, mutateAsync } = useMutation({
  //   mutationKey: ["userData"],
  //   mutationFn: (date) => axios.post("/user/update-date", { date }),
  // });

  async function updateDate(e) {
    e.preventDefault();
    if (!date) {
      toast.error("Date is required", { id: "date-required" });
      return;
    }

    if (date > new Date()) {
      toast.error("Date of birth can't be in the future");
      return;
    }

    const toastPromise = axios
      .post("/users/update-date", { date })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
      });

    toast.promise(toastPromise, {
      loading: "Saving",
      success: "Saved",
      error: "Error when fetching",
    });
  }

  return (
    <div className="">
      <div className="">
        <form onSubmit={updateDate} className="flex gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="date" className="text-sm font-semibold">
              Date of Birth{" "}
              {userData.user.dateOfBirth && (
                <span>
                  (
                  {new Date(userData.user.dateOfBirth).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  )
                </span>
              )}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal h-9",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date || userData.user.dateOfBirth}
                  onSelect={setDate}
                  initialFocus
                  id="date"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button className="self-end h-9" type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default DatePicker;
