import { AppContext } from "@/App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US");

function IncomeAndExpense() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-card max-w-80 h-52 rounded-[20px] p-5 flex flex-col items-center gap-4 justify-center text-center shadow-md">
      <h3>
        Your expenses are{" "}
        <span className="font-bold text-primary">
          {((userData.user.expense * 100) / userData.user.income).toFixed(1)}%
        </span>{" "}
        of your income
      </h3>
      <div className="flex gap-4">
        <div className="bg-primary sm:min-w-32 h-20 rounded-xl text-center text-background p-2">
          <p className="">Income</p>
          <p className="font-bold text-2xl">
            {userData.user.currency}
            {formatter.format(userData.user.income)}
          </p>
        </div>
        <div className="bg-primary  sm:min-w-32 h-20 rounded-xl text-center text-background p-2">
          <p className="">Expense</p>
          <p className="font-bold text-2xl">
            {userData.user.currency}
            {formatter.format(userData.user.expense)}
          </p>
        </div>
      </div>
      <p className=" text-sm">
        You can update this{" "}
        <Link className="text-primary font-bold" to={"/account"}>
          here.
        </Link>{" "}
      </p>
      {/* <Button className="">Make a transaction</Button> */}
    </div>
  );
}

export default IncomeAndExpense;
