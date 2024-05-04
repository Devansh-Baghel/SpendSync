import { useContext } from "react";
import { AppContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US");

function AccountBalance() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10 shadow-md">
      <h3 className="text-center text-md">Account Balance</h3>
      <h2 className="text-4xl">
        {userData.user.currency}
        {formatter.format(userData.user.currentBalance)}
      </h2>
      <Link to={"/create-transaction"}>
        <Button className="">Make a transaction</Button>
      </Link>
    </div>
  );
}

export default AccountBalance;
