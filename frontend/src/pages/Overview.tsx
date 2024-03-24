import { useContext } from "react";
import { AppContext } from "@/App";
import AccountBalance from "@/components/AccountBalance";
import InitialDeposit from "@/components/InitialDeposit";
import IncomeAndExpense from "@/components/IncomeAndExpense";
import AddIncomeAndExpense from "@/components/AddIncomeAndExpense";
import CheckoutButton from "@/components/CheckoutButton";

function Overview() {
  const { userData } = useContext(AppContext);

  console.log(userData.user.isPaidUser);

  return (
    <div className="bg-primary rounded-[25px] md:w-screen py-6 px-5 sm:px-8 mt-[-100px] md:mt-0">
      <h1 className="text-3xl font-bold text-background mb-5">Overview</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
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
        {!userData.user.isPaidUser && <CheckoutButton />}
      </div>
    </div>
  );
}

export default Overview;
