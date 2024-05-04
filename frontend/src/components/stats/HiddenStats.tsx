import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { PolarArea } from "react-chartjs-2";

const data = {
  labels: ["Blue", "Red", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

function HiddenStats() {
  return (
    <div className="flex flex-wrap blur-[5px] gap-6">
      <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
        <Doughnut data={data} />
      </div>
      <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 flex flex-col items-center gap-10">
        <Line data={data} />
      </div>
      <div className="bg-card h-60 rounded-[20px] p-5">
        <PolarArea data={data} />
      </div>
      <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 md:flex flex-col items-center gap-10 hidden ">
        <Bar data={data} />
      </div>
      <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 md:flex flex-col items-center gap-10 hidden ">
        <Pie data={data} />
      </div>
      <div className="bg-card max-w-80 h-60 rounded-[20px] p-5 md:flex flex-col items-center gap-10 hidden ">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default HiddenStats;
