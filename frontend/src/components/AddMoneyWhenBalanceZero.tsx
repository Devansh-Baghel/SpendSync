import { Button } from "@/components/ui/button";

function AddMoneyWhenBalanceZero() {
  return (
    <div className="bg-card w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
      <h3 className="text-center text-md">Your account is empty</h3>
      <h2 className="text-4xl"> $0 </h2>
      <Button className="">Add Money</Button>
    </div>
  );
}

export default AddMoneyWhenBalanceZero;
