import { ResponsiveContainer } from "recharts";

const ChartContainer = ({ children }) => (
  <ResponsiveContainer width="100%" height="100%">
    {children}
  </ResponsiveContainer>
);

export default ChartContainer;