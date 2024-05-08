import { Bar } from "react-chartjs-2";

interface TimeRangeProps {
  timeRange: "week" | "month" | "year";
}

function TimeRangeIncomeAndExpense({ timeRange }: TimeRangeProps) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: `Income and expense for this ${timeRange}`,
        data: [122, 123],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-card max-w-[300px] rounded-[20px] p-5 flex flex-col items-center gap-4">
      <p className="font-medium text-center flex items-center">
        Income and expense for this {timeRange}
      </p>
      <Bar data={data} />
    </div>
  );
}

export default TimeRangeIncomeAndExpense;
