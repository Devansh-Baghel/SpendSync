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

function ExpenseTransactionCard() {
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [date, setDate] = useState<Date | undefined>();
  const [wallet, setWallet] = useState<string>("Cash");
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
    if (!wallet) {
      toast.error("Wallet is required");
      return;
    }

    if (receipt) {
      const formData = new FormData();
      formData.append("receipt", receipt);

      const toastPromise = axios
        .post("/transaction/create-expense", formData, {
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
          loading: "Saving Avatar",
          success: "Saved Avatar",
          error: "Eror when fetching",
        },
        {
          id: "saving-avatar",
        }
      );
    }
  }

  return (
    <Card>
      <form onSubmit={createExpense}>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          {/* <CardDescription>
      Make changes to your account here. Click save when you're done.
    </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-2 flex flex-col gap-1.5">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Paid rent"
              maxLength={20}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-6">
            <div className="w-[150px] space-y-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                min={1}
                required
                placeholder="- 200"
                onChange={(e) => setAmount(+e.target.value)}
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label>Wallet</Label>
              <Select
                onValueChange={(value) => setWallet(value)}
                value={wallet}
              >
                <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
                  <SelectValue placeholder="Wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit card">Credit card</SelectItem>
                  <SelectItem value="Debit card">Debit card</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
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
            <div className="mb-[4px] flex-1">
              <Label>Category</Label>
              <Select
                onValueChange={(value) => setCategory(value)}
                value={category}
              >
                <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
                  <SelectValue placeholder="Optional Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Food & Drinks">Food & Drinks</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Bills & Fees">Bills & Fees</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export default ExpenseTransactionCard;
