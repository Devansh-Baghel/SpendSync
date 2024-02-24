import { AppContext } from "@/App";
import { useContext } from "react";

function IncomeAndExpense() {
  const { userData } = useContext(AppContext);

  return (
    <div className="bg-card w-80 h-48 rounded-[20px] p-5 flex flex-col items-center gap-4 justify-center text-center">
      <h3>Your expenses are <span className="font-bold text-primary">{((userData.user.expense*100)/userData.user.income).toFixed(1)}%</span> of your income</h3>
      <div className="flex gap-4">
        <div className="bg-primary w-32 h-20 rounded-xl text-center text-background p-2">
          <p className="">Income</p>
          <p className="font-bold text-2xl">${userData.user.income}</p>
        </div>
        <div className="bg-primary w-32 h-20 rounded-xl text-center text-background p-2">
          <p className="">Expense</p>
          <p className="font-bold text-2xl">${userData.user.expense}</p>
      </div>
      </div>
      {/* <Button className="">Make a transaction</Button> */}
    </div>
  );
}

export default IncomeAndExpense;
