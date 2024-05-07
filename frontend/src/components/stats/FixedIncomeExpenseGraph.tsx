import { AppContext } from "@/App";
import "chart.js/auto";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import AddIncomeAndExpense from "../AddIncomeAndExpense";

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
        <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
          <Doughnut data={data} />
        </div>
      ) : (
        <AddIncomeAndExpense />
      )}
    </>
  );
}

export default FixedIncomeExpenseGraph;
