import { useContext } from "react";
import { AppContext } from "@/App";
import { Button } from "@/components/ui/button";

function AccountBalance() {
  const { userData } = useContext(AppContext);

  console.log(userData);

  return (
    <div className="bg-card w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
      <h3 className="text-center text-md">Account Balance</h3>
      <h2 className="text-4xl"> ${userData.user.currentBalance} </h2>
      <Button className="">Make a transaction</Button>
    </div>
  );
}

export default AccountBalance;
