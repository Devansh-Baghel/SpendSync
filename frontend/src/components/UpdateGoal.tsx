import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
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
import { useContext, useState, useEffect, FormEvent } from "react";
import { AppContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";

function UpdateGoal() {
  const { setUserData, selectedGoal, setSelectedGoal } = useContext(AppContext);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [title, setTitle] = useState(selectedGoal.title);
  const [amount, setAmount] = useState(selectedGoal.finalAmount);
  const [category, setCategory] = useState(selectedGoal.category);
  const [description, setDescription] = useState(selectedGoal.description);
  const { toast } = useToast();

  useEffect(() => {
    setTitle(selectedGoal.title);
    setAmount(selectedGoal.finalAmount);
    setCategory(selectedGoal.category);
    setDescription(selectedGoal.description);
  }, [selectedGoal]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title === undefined || amount === undefined) return;

    if (
      title === selectedGoal.title &&
      amount === selectedGoal.finalAmount &&
      category === selectedGoal.category &&
      description === selectedGoal.description
    ) {
      toast({
        // title: "Scheduled: Catch up",
        description: "No Changes Made",
      });
      setSheetOpen(false);
      return;
    }
    await axios
      .post("/goals/update-goal", {
        goalId: selectedGoal._id,
        title,
        finalAmount: amount,
        category,
        description,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
        setSelectedGoal(res.data.data.goal);
        setSheetOpen(false);
      });
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <Button
        variant={"outline"}
        onClick={() => {
          setSheetOpen(true);
        }}
      >
        Update this Goal
      </Button>
      <SheetContent>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <SheetHeader>
            <SheetTitle>Update this Goal</SheetTitle>
            <SheetDescription>
              Change whatever you want to update and click save.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label>Title</Label>
              <Input
                id="title"
                className="col-span-3"
                type="text"
                maxLength={30}
                required
                placeholder="To buy a house"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="">
              <Label>Amount</Label>
              <Input
                id="amount"
                className="col-span-3"
                type="number"
                min={1}
                required
                placeholder="How much do you want to save?"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                onValueChange={(value) => setCategory(value)}
                value={category}
              >
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
              <Label>Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description here"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateGoal;
