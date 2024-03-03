import { Button } from "@/components/ui/button";
import { FormEvent, useContext, useState } from "react";
import { AppContext } from "@/App";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-hot-toast";

const formatter = new Intl.NumberFormat("en-US");

function UpdateAccountBalance() {
  const { userData, setUserData } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState<number>();

  async function updateAccountBalance(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (amount === undefined) {
      toast.error("New account balance is required");
      return;
    }
    if (amount < 1) {
      toast.error(
        `Account balance can't be less than ${userData.user.currency}1`
      );
      return;
    }

    await axios
      .post("/users/update-account-balance", {
        newAmount: amount,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
        setModalOpen(false);
        toast.success(
          `Account balance updated to ${
            userData.user.currency
          }${formatter.format(amount)}`
        );
      });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Update Account Balance</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={updateAccountBalance}>
          <DialogHeader>
            <DialogTitle>Update Account Balance</DialogTitle>
            <DialogDescription>
              Add your new account balance. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1.5 py-4">
            <Label htmlFor="amount">New Account Balance</Label>
            <Input
              id="amount"
              className="col-span-3"
              type="number"
              min="1"
              required
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateAccountBalance;
