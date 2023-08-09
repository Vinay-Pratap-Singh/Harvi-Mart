import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { SkeletonCircle } from "@chakra-ui/react";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }: any) => {
  return data ? <Pie data={data} /> : <SkeletonCircle w={48} h={48} />;
};

export default PieChart;
