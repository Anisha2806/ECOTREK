
import React from 'react';
import { EnergyGoal } from '@/types';

interface ProgressChartProps {
  goal: EnergyGoal;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goal }) => {
  const { targetPercentage, currentPercentage } = goal;
  const progress = (currentPercentage / targetPercentage) * 100;
  const clampedProgress = Math.min(progress, 100);
  
  // Calculate colors based on progress
  const getColor = () => {
    if (progress >= 100) return 'bg-renewable';
    if (progress >= 75) return 'bg-renewable/80';
    if (progress >= 50) return 'bg-yellow-400';
    return 'bg-nonrenewable';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Renewable Energy Goal</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{currentPercentage}%</span>
          <span className="text-xs text-muted-foreground">of {targetPercentage}%</span>
        </div>
      </div>
      
      <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-in-out ${getColor()}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        {progress >= 100 ? (
          <span className="text-renewable font-medium">Goal achieved! 🎉</span>
        ) : (
          <span>{Math.round(100 - clampedProgress)}% remaining to reach your goal</span>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;
