import { 
  BarChart, 
  Bar, 
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
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <p className="font-medium text-gray-900">{label}</p>
      {payload.map((item, index) => (
        <p key={index} className="text-sm" style={{ color: item.color }}>
          {item.name}: {item.value}
          {item.name === 'Temperature' ? '°C' : 
            item.name === 'Humidity' ? '%' : 
            item.name === 'Wind Speed' ? ' m/s' : ''}
        </p>
      ))}
    </div>
  );
};

const WeatherBarChart = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weather Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={0}
              barSize={20}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="opacity-30"
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ 
                  value: 'Value', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#6b7280' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  paddingBottom: '20px',
                  borderBottom: '1px solid #e5e7eb'
                }}
              />
              <Bar 
                dataKey="temp" 
                fill="#ef4444" 
                name="Temperature"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
                onMouseOver={(data, index) => {
                  // Add hover effect if needed
                }}
              />
              <Bar 
                dataKey="humidity" 
                fill="#3b82f6" 
                name="Humidity"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
              />
              <Bar 
                dataKey="windSpeed" 
                fill="#8b5cf6" 
                name="Wind Speed"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherBarChart;