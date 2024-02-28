import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
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
  const [amount, setAmount] = useState();

  async function updateAccountBalance(e) {
    e.preventDefault();
    if (amount === undefined) toast.error("New account balance is required");
    if (amount < 1) toast.error("Account balance can't be less than $1");

    await axios
      .post("/users/update-account-balance", {
        newAmount: amount,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
        setModalOpen(false);
        toast.success(
          `Account balance updated to $${formatter.format(amount)}`
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                New Account Balance
              </Label>
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
