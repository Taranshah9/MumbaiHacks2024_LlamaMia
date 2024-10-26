import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
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
        <p 
          key={index} 
          className="text-sm" 
          style={{ color: item.color || item.stroke || item.fill }}
        >
          {item.name}: {item.value}
          {item.name === 'Temperature' ? '°C' : 
            item.name === 'Humidity' ? '%' : 
            item.name === 'Wind Speed' ? ' m/s' : ''}
        </p>
      ))}
    </div>
  );
};

const WeatherComposedChart = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weather Conditions Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="windSpeedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.6}/>
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
                  value: 'Humidity & Wind Speed', 
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
              <Bar 
                dataKey="temp" 
                fill="url(#tempGradient)" 
                name="Temperature"
                yAxisId="temp"
                radius={[4, 4, 0, 0]}
                barSize={20}
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
              <Area 
                type="monotone" 
                dataKey="windSpeed" 
                fill="url(#windSpeedGradient)"
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Wind Speed"
                yAxisId="humidity"
                dot={false}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherComposedChart;