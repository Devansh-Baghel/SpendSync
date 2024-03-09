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
import { FormEvent, useContext, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-hot-toast";
import { AppContext } from "@/App";
import axios from "axios";

function DatePicker() {
  const { userData, setUserData } = useContext(AppContext);
  const [date, setDate] = useState(userData.user.dateOfBirth);

  // const { mutate, mutateAsync } = useMutation({
  //   mutationKey: ["userData"],
  //   mutationFn: (date) => axios.post("/user/update-date", { date }),
  // });

  async function updateDate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date) {
      toast.error("Date is required", { id: "date-required" });
      return;
    }

    if (date > new Date()) {
      toast.error("Date of birth can't be in the future", {
        id: "date-in-future",
      });
      return;
    }

    if (date === userData.user.dateOfBirth) {
      toast.error("This date of birth has already been set by you", {
        id: "date-already-set",
        icon: "📌",
      });
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
        <form onSubmit={updateDate} className="flex gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  className={cn(
                    "sm:w-[240px] justify-start text-left font-normal h-9",
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
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  id="date"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button className="sm:mt-[26px] h-9" type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default DatePicker;
