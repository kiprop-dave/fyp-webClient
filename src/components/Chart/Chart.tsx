import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  label: string;
  temperature: number[];
  humidity: number[];
  labels: string[];
  isError: boolean;
  errorMessage: string;
}

const ChartComponent = ({
  label,
  labels,
  temperature,
  humidity,
  isError,
  errorMessage,
}: ChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: label,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "temperature",
        data: temperature,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "humidity",
        data: humidity,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      {isError ? <p>{errorMessage}</p> : <Line data={data} options={options} />}
    </div>
  );
};

export default ChartComponent;
