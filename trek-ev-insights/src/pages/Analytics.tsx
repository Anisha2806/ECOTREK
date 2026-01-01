
import React from 'react';
import Header from '@/components/layout/Header';
import Charts from '@/components/analytics/Charts';
import { LineChart, Gauge, Zap } from 'lucide-react';
import { statsData, trendData } from '@/utils/dummyData';

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Detailed performance metrics and energy usage patterns
          </p>
        </div>
        
        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={<Zap className="w-6 h-6 text-eco-blue" />}
            title="Monthly Energy Saved"
            value={statsData.monthly.energySaved}
            unit="kWh"
            change={+12.4}
          />
          
          <StatCard 
            icon={<LineChart className="w-6 h-6 text-eco-green" />}
            title="Efficiency Trend"
            value={statsData.monthly.efficiency}
            unit="%"
            change={+3.2}
          />
          
          <StatCard 
            icon={<Gauge className="w-6 h-6 text-eco-yellow" />}
            title="Recovery Potential"
            value={62}
            unit="%"
            change={-2.8}
            secondaryText="of maximum possible"
          />
        </div>
        
        {/* Charts Section */}
        <Charts />
        
        {/* Efficiency Trends */}
        <div className="glass-panel p-6 mt-8 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6">Efficiency Trends</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weekly Efficiency */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Last Month Performance</h3>
              
              <div className="space-y-3">
                {trendData.lastMonth.map((week) => (
                  <div key={week.week} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{week.week}</span>
                      <span className="text-sm font-medium">{week.efficiency}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${week.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Seasonal Impact */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Seasonal Impact</h3>
              <p className="text-sm text-muted-foreground">
                How seasons affect your vehicle's efficiency
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <SeasonalCard 
                  season="Winter" 
                  impact={trendData.seasonalImpact.winter} 
                />
                <SeasonalCard 
                  season="Spring" 
                  impact={trendData.seasonalImpact.spring} 
                />
                <SeasonalCard 
                  season="Summer" 
                  impact={trendData.seasonalImpact.summer} 
                />
                <SeasonalCard 
                  season="Fall" 
                  impact={trendData.seasonalImpact.fall} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border/40 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EcoTreck. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed for optimal EV energy management
          </p>
        </div>
      </footer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  change: number;
  secondaryText?: string;
}

const StatCard = ({ icon, title, value, unit, change, secondaryText }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-secondary dark:bg-muted mr-3">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-1 text-lg">{unit}</span>
      </div>
      
      {secondaryText && (
        <p className="text-xs text-muted-foreground mt-1">{secondaryText}</p>
      )}
      
      <div className={`mt-4 text-sm flex items-center ${
        isPositive ? 'text-eco-green' : 'text-eco-red'
      }`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span className="ml-1">{Math.abs(change)}% from last month</span>
      </div>
    </div>
  );
};

interface SeasonalCardProps {
  season: string;
  impact: number;
}

const SeasonalCard = ({ season, impact }: SeasonalCardProps) => {
  const isPositive = impact >= 0;
  
  return (
    <div className="bg-white/40 dark:bg-white/5 rounded-xl p-4 border border-white/30 dark:border-white/10">
      <h4 className="font-medium">{season}</h4>
      <div className={`mt-2 flex items-center ${
        isPositive ? 'text-eco-green' : 'text-eco-red'
      }`}>
        <span className="text-xl font-bold">{isPositive ? '+' : ''}{impact}%</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {isPositive ? 'Efficiency gain' : 'Efficiency loss'}
      </p>
    </div>
  );
};

export default Analytics;
