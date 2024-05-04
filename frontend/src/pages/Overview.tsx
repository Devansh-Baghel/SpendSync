import { useContext } from "react";
import { AppContext } from "@/App";
import AccountBalance from "@/components/AccountBalance";
import InitialDeposit from "@/components/InitialDeposit";
import IncomeAndExpense from "@/components/IncomeAndExpense";
import AddIncomeAndExpense from "@/components/AddIncomeAndExpense";
import CheckoutButton from "@/components/CheckoutButton";
import RecentTransactions from "@/components/RecentTransactions";
import useTitle from "@/hooks/useTitle";

function Overview() {
  useTitle("Dashboard");
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
        <div className="flex gap-6 flex-col">
          {!userData.user.isPaidUser && <CheckoutButton />}
          <RecentTransactions />
          <p className="text-xl text-background font-bold self-center justify-self-end">
            Try using{" "}
            <span className="bg-background text-primary rounded-lg py-1 px-3 text-sm">
              ctrl + k
            </span>{" "}
            for faster navigation
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
