import { useContext, useState } from "react";
import { AppContext } from "@/App";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddIncomeAndExpense() {
  const { userData } = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("a;sdf");
    setModalOpen(false)
  }

  return (
    <div className="bg-card w-80 h-48 rounded-[20px] p-5 flex flex-col items-center gap-10">
      <h3 className="text-center text-md">
        You haven't set your income and expenses yet.
      </h3>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Income and Expenses</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Income and Expenses</DialogTitle>
              <DialogDescription>
                Add your income and expenses here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="income" className="text-right">
                  Income
                </Label>
                <Input
                  id="income"
                  className="col-span-3"
                  type="number"
                  min="0"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expense" className="text-right">
                  Expense
                </Label>
                <Input
                  id="expense"
                  className="col-span-3"
                  type="number"
                  min="0"
                  required
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

export default AddIncomeAndExpense;
