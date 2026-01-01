
import React from 'react';
import { Leaf, CloudLightning, Gauge, Battery } from 'lucide-react';
import { EnergyInput } from '@/types';
import { calculateEnergyTotals, calculatePercentages, calculateEmissions } from '@/utils/energyUtils';

interface EnergyInsightsProps {
  data: EnergyInput[];
  timeFilter: string;
}

const EnergyInsights: React.FC<EnergyInsightsProps> = ({ data, timeFilter }) => {
  const { renewable, nonRenewable } = calculateEnergyTotals(data);
  const { renewablePercentage, nonRenewablePercentage } = calculatePercentages(renewable, nonRenewable);
  
  // Get most recent energy input to determine the unit
  const mostRecentUnit = data.length > 0 ? data[0].unit : 'kWh';
  
  // Calculate emissions
  const emissions = calculateEmissions(nonRenewable, mostRecentUnit);
  
  const insights = [
    {
      title: "Renewable Usage",
      value: `${renewable.toFixed(1)} ${mostRecentUnit}`,
      percentage: `${renewablePercentage}%`,
      icon: Leaf,
      color: "text-renewable",
      bgColor: "bg-renewable/10"
    },
    {
      title: "Non-Renewable Usage",
      value: `${nonRenewable.toFixed(1)} ${mostRecentUnit}`,
      percentage: `${nonRenewablePercentage}%`,
      icon: CloudLightning,
      color: "text-nonrenewable",
      bgColor: "bg-nonrenewable/10"
    },
    {
      title: "Carbon Emissions",
      value: `${emissions.value} ${emissions.unit}`,
      percentage: `${emissions.equivalentTrees} trees`,
      icon: Gauge,
      color: "text-neutral",
      bgColor: "bg-neutral/10"
    },
    {
      title: "Efficiency Score",
      value: renewablePercentage >= 70 ? "Excellent" : renewablePercentage >= 50 ? "Good" : "Needs Improvement",
      percentage: "",
      icon: Battery,
      color: renewablePercentage >= 70 ? "text-renewable" : renewablePercentage >= 50 ? "text-yellow-500" : "text-nonrenewable",
      bgColor: renewablePercentage >= 70 ? "bg-renewable/10" : renewablePercentage >= 50 ? "bg-yellow-500/10" : "bg-nonrenewable/10"
    }
  ];

  return (
    <div className="dashboard-card p-6 animate-scale-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">{timeFilter} Energy Insights</h2>
        <div className="chip bg-primary/10 text-primary">
          {data.length} entries
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`rounded-xl p-4 ${insight.bgColor} flex items-start gap-4 transition-transform duration-300 hover:scale-[1.02]`}
          >
            <div className={`p-2 rounded-full ${insight.bgColor} ${insight.color}`}>
              <insight.icon className="h-5 w-5" />
            </div>
            
            <div>
              <h3 className="text-sm font-medium">{insight.title}</h3>
              <p className={`text-lg font-semibold ${insight.color}`}>{insight.value}</p>
              {insight.percentage && (
                <p className="text-xs text-muted-foreground">
                  {insight.title === "Carbon Emissions" ? "Equivalent to" : ""} {insight.percentage}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyInsights;
