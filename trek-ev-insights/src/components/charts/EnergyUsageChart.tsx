
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/types';

interface EnergyUsageChartProps {
  data: ChartData[];
  title?: string;
}

const COLORS = {
  Renewable: '#34D399',
  NonRenewable: '#F87171'
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontWeight="medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="card-glass p-2 text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">
          {payload[0].value.toFixed(1)} {payload[0].payload.unit}
        </p>
        <p className="text-xs mt-1 font-medium" style={{ color: COLORS[payload[0].payload.type] }}>
          {payload[0].payload.type}
        </p>
      </div>
    );
  }

  return null;
};

const EnergyUsageChart: React.FC<EnergyUsageChartProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <p className="text-muted-foreground">No data to display</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.type]} 
                className="transition-opacity duration-300 hover:opacity-80" 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            formatter={(value, entry, index) => {
              const item = data[index];
              return (
                <span className="text-sm">
                  {item.name} ({item.type})
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyUsageChart;
