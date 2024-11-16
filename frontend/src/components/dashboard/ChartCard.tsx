// components/Dashboard/ChartCard.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

// Register required Chart.js components
ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const ChartCard: React.FC = () => {
  // Sample data for chart
  const data = {
    labels: [
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Apr",
    ],
    datasets: [
      {
        label: "Investment",
        data: [30, 32, 29, 31, 34, 36, 33, 35, 38, 40],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-gray-800 text-gray-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Total Investment</h2>
        <button className="text-sm bg-gray-700 text-gray-400 px-3 py-1 rounded-full">
          Last 7 days
        </button>
      </div>
      <div className="flex space-x-8 mb-6">
        <div>
          <p className="text-2xl font-semibold text-white">$1,279.95</p>
          <p className="text-green-500 flex items-center text-sm">
            1.22% <ChevronUpIcon className="w-4 h-4 ml-1" />
          </p>
          <p className="text-gray-400">Invested Value</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-white">$22,543.87</p>
          <p className="text-green-500 flex items-center text-sm">
            10.14% <ChevronUpIcon className="w-4 h-4 ml-1" />
          </p>
          <p className="text-gray-400">Total Returns</p>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartCard;
