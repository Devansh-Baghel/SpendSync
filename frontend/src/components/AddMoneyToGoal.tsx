import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useContext } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/App";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useToast } from "./ui/use-toast";
import axios from "axios";

function AddMoneyToGoal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState();
  const { selectedGoal, userData, setUserData } = useContext(AppContext);
  const { toast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!amountToAdd) return;

    if (selectedGoal.finalAmount < amountToAdd) {
      toast({
        description:
          "Amount to add can't be more than the final amount of the goal",
      });
      setModalOpen(false);
      return;
    }

    if (userData.user.currentBalance < amountToAdd) {
      toast({
        description: "You don't have enough balance to make this transaction",
      });
      setModalOpen(false);
      return;
    }

    await axios
      .post("/goals/add-money-to-goal", {
        goalId: selectedGoal._id,
        currentAmount: amountToAdd,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
        setModalOpen(false);
      });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add Money to This Goal
      </Button>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Add money to this goal</DialogTitle>
          <DialogDescription>
            You are adding money from your account to this goal.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="">
            <Label htmlFor="amount">Amount to Add</Label>
            <Input
              id="amount"
              className="mb-6"
              type="number"
              min={1}
              required
              placeholder="How much are you adding to this goal?"
              onChange={(e) => {
                setAmountToAdd(+e.target.value);
              }}
            />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddMoneyToGoal;