
import React, { useState } from 'react';
import { Battery, Leaf, Route } from 'lucide-react';
import { statsData } from '@/utils/dummyData';

type Period = 'daily' | 'weekly' | 'monthly';

const QuickStats = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('daily');
  
  const data = statsData[activePeriod];
  
  return (
    <div className="glass-panel p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Quick Stats</h2>
        <div className="flex space-x-1 bg-secondary dark:bg-muted rounded-full p-1">
          <button
            onClick={() => setActivePeriod('daily')}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              activePeriod === 'daily' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setActivePeriod('weekly')}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              activePeriod === 'weekly' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActivePeriod('monthly')}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              activePeriod === 'monthly' 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Battery className="w-8 h-8 text-eco-blue" />}
          title="Energy Saved"
          value={data.energySaved}
          unit="kWh"
          description={`${activePeriod === 'daily' ? 'Today' : activePeriod === 'weekly' ? 'This week' : 'This month'}`}
        />
        
        <StatCard 
          icon={<Leaf className="w-8 h-8 text-eco-green" />}
          title="Carbon Reduction"
          value={data.carbonReduction}
          unit="kg"
          description="CO₂ emissions avoided"
        />
        
        <StatCard 
          icon={<Route className="w-8 h-8 text-eco-yellow" />}
          title="Distance"
          value={data.distance}
          unit="km"
          description={`${Math.round(data.efficiency)}% efficiency`}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  description: string;
}

const StatCard = ({ icon, title, value, unit, description }: StatCardProps) => {
  return (
    <div className="bg-white/40 dark:bg-white/5 rounded-xl p-4 shadow-sm border border-white/30 dark:border-white/10">
      <div className="flex items-start">
        <div className="mr-3">{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{value}</span>
            <span className="ml-1 text-base">{unit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
