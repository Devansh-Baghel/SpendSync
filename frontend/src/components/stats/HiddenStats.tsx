import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

function HiddenStats() {
  return (
    <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
      <Doughnut data={data} />
    </div>
  );
}

export default HiddenStats;
