import { 
  AreaChart, 
  Area, 
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
        <p key={index} className="text-sm" style={{ color: item.stroke }}>
          {item.name}: {item.value}
          {item.name === 'Temperature' ? '°C' : 
            item.name === 'Humidity' ? '%' : 
            item.name === 'Wind Speed' ? ' m/s' : ''}
        </p>
      ))}
    </div>
  );
};

const WeatherAreaChart = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weather Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
                yAxisId="temp"
                tick={{ fill: '#6b7280' }}
                tickLine={{ stroke: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
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
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ 
                  value: 'Humidity (%)', 
                  angle: 90, 
                  position: 'insideRight',
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
              <Area 
                type="monotone" 
                dataKey="temp" 
                fill="url(#tempGradient)"
                stroke="#ef4444" 
                strokeWidth={2}
                name="Temperature"
                yAxisId="temp"
                dot={false}
                activeDot={{ r: 6, fill: "#ef4444" }}
              />
              <Area 
                type="monotone" 
                dataKey="humidity" 
                fill="url(#humidityGradient)"
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Humidity"
                yAxisId="humidity"
                dot={false}
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
              <Area 
                type="monotone" 
                dataKey="windSpeed" 
                fill="url(#windGradient)"
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Wind Speed"
                yAxisId="temp"
                dot={false}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherAreaChart;