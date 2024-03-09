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

function InitialDeposit() {
  const { setUserData } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [deposit, setDeposit] = useState<number>();

  async function addInitialDeposit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (deposit === undefined) {
      toast.error("Initial deposit is required");
      return;
    }
    if (deposit < 1) toast.error("Initial deposit can't be less than $1");

    await axios
      .post("/users/initial-deposit", {
        depositAmount: deposit,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        setUserData(res.data.data);
        setModalOpen(false);
        toast.success(
          `Initial deposit of $${formatter.format(deposit)} added!`
        );
      });
  }

  return (
    <div className="bg-card sm:w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
      <h3 className="text-center text-md">Your account is empty</h3>
      <h2 className="text-4xl"> $0 </h2>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button>Add Initial Deposit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={addInitialDeposit}>
            <DialogHeader>
              <DialogTitle>Add Initial Deposit</DialogTitle>
              <DialogDescription>
                Add the money that you currently have. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col grid-cols-4 gap-1.5">
                <Label htmlFor="deposit" className="">
                  Initial Deposit
                </Label>
                <Input
                  id="deposit"
                  className="col-span-3"
                  type="number"
                  min="1"
                  required
                  onChange={(e) => {
                    setDeposit(+e.target.value);
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
    </div>
  );
}

export default InitialDeposit;
