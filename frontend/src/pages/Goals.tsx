import { useContext, useState } from "react";
import { AppContext } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

function Goals() {
  const { userData } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Goals</h1>
      {userData.goals.length === 0 ? (
        <Card className="max-w-[400px] flex flex-col items-center min-h-40 justify-center">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              You don't have any goals yet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <Button>Add a New Goal</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                {/* <form onSubmit={handleSubmit}> */}
                <DialogHeader>
                  <DialogTitle>Add a New Goal</DialogTitle>
                  <DialogDescription>
                    Create a goal for yourself to save money!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      className="col-span-3"
                      type="text"
                      maxLength="30"
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
                      min="1"
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
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
                {/* </form> */}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <h2>Here are your goals</h2>
      )}
    </div>
  );
}

export default Goals;
