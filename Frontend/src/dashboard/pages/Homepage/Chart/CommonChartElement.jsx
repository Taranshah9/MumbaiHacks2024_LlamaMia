import { CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const CommonChartElements = () => (
  <>
    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
    <XAxis dataKey="date" stroke="#6b7280" />
    <YAxis stroke="#6b7280" />
    <Tooltip
      contentStyle={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    />
    <Legend />
  </>
);

export default CommonChartElements;