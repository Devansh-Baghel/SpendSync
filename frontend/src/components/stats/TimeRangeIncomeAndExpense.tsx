import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface TimeRangeProps {
  timeRange: "week" | "month" | "year";
  data: {
    income: number;
    expense: number;
  };
}

function TimeRangeIncomeAndExpense({ timeRange, data }: TimeRangeProps) {
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: `Income and expense for this ${timeRange}`,
        data: [data.income, data.expense],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverOffset: 4,
      },
    ],
  };

  if (!data.income && !data.expense) {
    return (
      <div className="bg-card max-w-[230px] rounded-[20px] p-5 flex flex-col justify-center items-center gap-4">
        <p className="text-sm text-center flex items-center">
          You didn't make any transactions this {timeRange}.
        </p>
        <Link to={"/create-transaction"}>
          <Button className="">Make a transaction</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card max-w-[300px] rounded-[20px] p-5 flex flex-col justify-between">
      <p className="text-sm text-center flex items-center justify-center">
        {timeRange.toUpperCase()}
      </p>
      <Bar data={chartData} />
    </div>
  );
}

export default TimeRangeIncomeAndExpense;
