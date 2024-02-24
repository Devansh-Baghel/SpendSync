import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/App";
import { FaPlus as PlusIcon } from "react-icons/fa";

function AddNewGoal() {
  const { setUserData } = useContext(AppContext);
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [sheetOpen, setSheetOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(title, amount, category, description);
    if (title === undefined || amount === undefined) return;
    await axios
      .post("/goals/create-goal", {
        title,
        finalAmount: amount,
        category,
        description,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
        setSheetOpen(false);
      });
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      {/* <SheetTrigger> */}
      <Button
        className="font-bold h-14 text-md w-72 flex gap-2"
        variant={"outline"}
        onClick={() => {
          setSheetOpen(true);
        }}
      >
        <PlusIcon className="w-5 h-5"/>
        Create a New Goal
      </Button>
      {/* </SheetTrigger> */}
      <SheetContent>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <SheetHeader>
            <SheetTitle>Create a New Goal</SheetTitle>
            <SheetDescription>
              Create a goal for yourself to save money!
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="col-span-3"
                type="text"
                maxLength={30}
                required
                placeholder="To buy a house"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                className="col-span-3"
                type="number"
                min={1}
                required
                placeholder="How much do you want to save?"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="h-9 data-[placeholder]:text-muted-foreground">
                  <SelectValue placeholder="Optional Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Retirement">Retirement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label htmlFor="description" className="">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Optional description here"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <SheetFooter>
            {/* <SheetClose asChild> */}
            <Button type="submit">Save changes</Button>
            {/* </SheetClose> */}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default AddNewGoal;
