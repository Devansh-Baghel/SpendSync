import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useState } from "react";

function NewTransaction() {
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [date, setDate] = useState();
  const [wallet, setWallet] = useState<string>("Cash");
  const [receipt, setReceipt] = useState();

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">
        Create a New Transaction
      </h1>

      <Tabs defaultValue="expense" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
          <Card>
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
                    placeholder="200"
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
                      <SelectItem value="Food & Drinks">
                        Food & Drinks
                      </SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Movie">Movie</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Entertainment">
                        Entertainment
                      </SelectItem>
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
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default NewTransaction;
