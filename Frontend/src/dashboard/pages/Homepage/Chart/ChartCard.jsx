import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ChartCard = ({ title, children }) => (
  <Card className="mb-8 shadow-lg">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="h-[400px]">
        {children}
      </div>
    </CardContent>
  </Card>
);
export default ChartCard;