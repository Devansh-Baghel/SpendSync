import { useContext } from "react";
import { AppContext } from "@/App";
import AccountBalance from "@/components/AccountBalance";
import InitialDeposit from "@/components/InitialDeposit";
import IncomeAndExpense from "@/components/IncomeAndExpense";
import AddIncomeAndExpense from "@/components/AddIncomeAndExpense";

function Overview() {
  const { userData } = useContext(AppContext);

  console.log(userData);

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Overview</h1>
      {userData.user.currentBalance === 0 ? (
        <InitialDeposit />
      ) : (
        <AccountBalance />
      )}
      <h1 className="text-2xl font-bold text-background my-5">
        Income and expense
      </h1>
      {userData.user.hasSetIncomeAndExpense ? (
        <IncomeAndExpense />
      ) : (
        <AddIncomeAndExpense />
      )}
    </div>
  );
}

export default Overview;
