import { FormEvent, useContext, useState } from "react";
import { AppContext } from "@/App";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

function FirstGoal() {
  const { setUserData } = useContext(AppContext);
  const [title, setTitle] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [description, setDescription] = useState<string>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title === undefined || amount === undefined) return;
    await axios
      .post("/goals/create-goal", {
        title,
        finalAmount: amount,
        category,
        description,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
      });
  }

  return (
    <Card className="max-w-[400px]">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <CardHeader>
          <CardTitle>Add a New Goal</CardTitle>
          <CardDescription>
            Create a goal for yourself to save money!
          </CardDescription>
        </CardHeader>
        <CardContent className="sm:max-w-[425px]">
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
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
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                className="col-span-3"
                type="number"
                min={1}
                required
                placeholder="How much do you want to save?"
                onChange={(e) => {
                  setAmount(+e.target.value);
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
        </CardContent>
        <CardFooter>
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default FirstGoal;
