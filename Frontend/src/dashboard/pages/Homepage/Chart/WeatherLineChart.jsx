import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="font-medium text-gray-900">{label}</p>
      {payload.map((item, index) => (
        <p key={index} className="text-sm" style={{ color: item.color }}>
          {item.name}: {item.value}
          {item.name === 'Temperature' ? '°C' : '%'}
        </p>
      ))}
    </div>
  );
};
const WeatherLineChart = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Temperature & Humidity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
              />
              <YAxis 
                yAxisId="temp"
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
                label={{ 
                  value: 'Temperature (°C)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#6b7280' }
                }}
              />
              <YAxis 
                yAxisId="humidity"
                orientation="right"
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
                label={{ 
                  value: 'Humidity (%)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { fill: '#6b7280' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{
                  paddingTop: '20px',
                  borderTop: '1px solid #e5e7eb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#ef4444" 
                strokeWidth={2} 
                name="Temperature"
                yAxisId="temp"
                dot={false}
                activeDot={{ r: 6, fill: "#ef4444" }}
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Humidity"
                yAxisId="humidity"
                dot={false}
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherLineChart;