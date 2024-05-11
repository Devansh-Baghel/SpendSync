import { AppContext } from "@/App";
import "chart.js/auto";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import AddIncomeAndExpense from "../AddIncomeAndExpense";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaInfoCircle as InfoIcon } from "react-icons/fa";
import { Link } from "react-router-dom";

function FixedIncomeExpenseGraph() {
  const { userData } = useContext(AppContext);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Fixed income and expense",
        data: [userData.user.income, userData.user.expense],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      {userData.user.hasSetIncomeAndExpense ? (
        <div className="bg-card max-w-[300px] rounded-[20px] p-5 flex flex-col items-center gap-4">
          <p className="font-medium text-center flex items-center">
            Fixed Income and Expense
            <HoverCard>
              <HoverCardTrigger>
                <InfoIcon className="inline ml-2 mb-[2px] cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent className="text-sm font-normal">
                This is the fixed income and expense that you can update in{" "}
                <Link to="/account" className="underline text-primary">
                  your account page.
                </Link>
              </HoverCardContent>
            </HoverCard>
          </p>
          <Doughnut data={data} />
        </div>
      ) : (
        <AddIncomeAndExpense />
      )}
    </>
  );
}

export default FixedIncomeExpenseGraph;
