import { useContext, useState } from "react";
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

function Goals() {
  const { userData } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Goals</h1>
      {userData.goals.length === 0 ? (
        <Card className="max-w-[400px]">
          <form onSubmit={handleSubmit}>
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
                    setAmount(e.target.value);
                  }}
                />
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
      ) : (
        <h2>Here are your goals</h2>
      )}
    </div>
  );
}

export default Goals;
