import { useContext, useEffect } from "react";
import { AppContext } from "@/App";
import AccountBalance from "@/components/AccountBalance";
import AddMoneyWhenBalanceZero from "@/components/AddMoneyWhenBalanceZero";
import IncomeAndExpense from "@/components/IncomeAndExpense";
import AddIncomeAndExpense from "@/components/AddIncomeAndExpense";

function Overview() {
  const { userData } = useContext(AppContext);

  console.log(userData);

  return (
    <div className="bg-primary rounded-[25px] w-screen h-[92vh] py-8 px-12">
      <h1 className="text-3xl font-bold text-background mb-5">Overview</h1>
      {userData.currentBalance === 0 ? (
        <AddMoneyWhenBalanceZero />
      ) : (
        <AccountBalance />
      )}
      <h1 className="text-2xl font-bold text-background my-5">
        Income and expense
      </h1>
      {userData.hasSetIncomeAndExpense ? (
        <IncomeAndExpense />
      ) : (
        <AddIncomeAndExpense />
      )}
    </div>
  );
}

export default Overview;
