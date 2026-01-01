
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { energyChartData, energySourceData, brakingData } from '@/utils/dummyData';
import { useTheme } from '@/context/ThemeContext';

const Charts = () => {
  const { resolvedTheme } = useTheme();
  
  // Colors for chart elements
  const consumedColor = '#118AB2'; // blue
  const recoveredColor = '#3DDB85'; // green
  const textColor = resolvedTheme === 'dark' ? '#E1E8EF' : '#222222';
  const gridColor = resolvedTheme === 'dark' ? '#2A3441' : '#E1E8EF';
  
  // Colors for pie chart
  const pieColors = ['#3DDB85', '#118AB2', '#FFD166', '#06D6A0'];
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Energy Consumption Line Chart */}
      <div className="glass-panel p-6">
        <h2 className="text-2xl font-semibold mb-6">Energy Consumption & Recovery</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={energyChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
            <XAxis 
              dataKey="day" 
              stroke={textColor} 
              tick={{ fill: textColor }} 
            />
            <YAxis 
              stroke={textColor} 
              tick={{ fill: textColor }}
              label={{ 
                value: 'Energy (kWh)', 
                angle: -90, 
                position: 'insideLeft', 
                fill: textColor 
              }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: resolvedTheme === 'dark' ? '#1A1F2C' : '#FFFFFF',
                borderColor: gridColor,
                borderRadius: '0.5rem',
                color: textColor
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="consumed" 
              name="Energy Consumed"
              stroke={consumedColor} 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
              dot={{ r: 4 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="recovered" 
              name="Energy Recovered"
              stroke={recoveredColor} 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
              dot={{ r: 4 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Energy Source Pie Chart */}
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold mb-6">Energy Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={energySourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
              >
                {energySourceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={pieColors[index % pieColors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: resolvedTheme === 'dark' ? '#1A1F2C' : '#FFFFFF',
                  borderColor: gridColor,
                  borderRadius: '0.5rem',
                  color: textColor
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Braking Behavior Bar Chart */}
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold mb-6">Braking Behavior</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={brakingData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
              <XAxis 
                dataKey="time" 
                stroke={textColor} 
                tick={{ fill: textColor }} 
              />
              <YAxis 
                stroke={textColor} 
                tick={{ fill: textColor }} 
                label={{ 
                  value: 'Percentage', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: textColor 
                }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: resolvedTheme === 'dark' ? '#1A1F2C' : '#FFFFFF',
                  borderColor: gridColor,
                  borderRadius: '0.5rem',
                  color: textColor
                }} 
              />
              <Legend />
              <Bar 
                dataKey="regenerative" 
                name="Regenerative Braking"
                stackId="a" 
                fill={recoveredColor} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="mechanical" 
                name="Mechanical Braking"
                stackId="a" 
                fill={consumedColor} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
