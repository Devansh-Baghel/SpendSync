import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "@/App";

function IncomeTransactionCard() {
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [category, setCategory] = useState<string>("Salary");
  const [date, setDate] = useState<Date | undefined>();
  const [receipt, setReceipt] = useState<File | undefined>();
  const { setUserData } = useContext(AppContext);

  function createExpense(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (!amount) {
      toast.error("Amount is required");
      return;
    }

    if (receipt) {
      if (!["image/jpeg", "image/png"].includes(receipt?.type)) {
        toast.error("Only jpeg and png files are allowed");
        return;
      }

      const formData = new FormData();
      formData.append("receipt", receipt);
      formData.append("title", title);
      formData.append("amount", amount.toString());
      if (category !== undefined) formData.append("category", category);
      formData.append("date", date?.toISOString() || "");

      const toastPromise = axios
        .post("/transaction/create-income", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setUserData(res.data.data);
        });

      toast.promise(
        toastPromise,
        {
          loading: "Saving income...",
          success: "Income saved successfully!",
          error: "Failed to save income. Please try again.",
        },
        {
          id: "saving-income",
        }
      );
    } else {
      const data = {
        title,
        amount,
        category,
        date,
      };

      const toastPromise = axios
        .post("/transaction/create-income", data)
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setUserData(res.data.data);
        });

      toast.promise(
        toastPromise,
        {
          loading: "Saving income...",
          success: "Income saved successfully!",
          error: "Failed to save income. Please try again.",
        },
        {
          id: "saving-income",
        }
      );
    }
  }

  return (
    <Card>
      <form onSubmit={createExpense}>
        <CardHeader>
          <CardTitle>Add Income</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 flex flex-col gap-1.5">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Salary!"
              maxLength={40}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex sm:items-center gap-4 sm:gap-6 flex-col sm:flex-row">
            <div className="flex-1 space-y-1 mb-[5px]">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                min={1}
                required
                placeholder="+ 8,400"
                onChange={(e) => setAmount(+e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "sm:w-[160px] justify-start text-left font-normal",
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
          </div>
          <div className="space-y-1">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => setCategory(value)}
              value={category}
            >
              <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
                <SelectValue placeholder="Optional Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Extra Income">Extra Income</SelectItem>
                <SelectItem value="Loan">Loan</SelectItem>
                <SelectItem value="Gifts">Gifts</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="receipt" className="tex-md">
              Upload Receipt
            </Label>
            <Input
              id="receipt"
              type="file"
              name="receipt"
              className="file:text-primary h-10 file:mt-1 cursor-pointer"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                if (!e.target.files) return;
                setReceipt(e.target.files[0]);
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default IncomeTransactionCard;
