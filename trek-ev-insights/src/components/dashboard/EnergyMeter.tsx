
import React, { useEffect, useState } from 'react';
import { Battery, BatteryCharging, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { batteryData } from '@/utils/dummyData';

const EnergyMeter = () => {
  const { resolvedTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [animatedCharge, setAnimatedCharge] = useState(0);
  
  // Colors based on theme
  const trackColor = resolvedTheme === 'dark' ? '#2A3441' : '#E1E8EF';
  const progressColor = 
    animatedCharge > 70 ? '#3DDB85' : 
    animatedCharge > 30 ? '#FFD166' : 
    '#EF476F';
  
  // Set up animation on load
  useEffect(() => {
    setProgress(0);
    const timer = setTimeout(() => {
      setProgress(batteryData.currentCharge);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Animate charge percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCharge(prev => {
        if (prev < batteryData.currentCharge) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [progress]);
  
  // Calculate stroke dash values for the circular progress
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // Calculate estimated range based on current charge
  const estimatedRange = Math.round((batteryData.maxRange * animatedCharge) / 100);
  
  return (
    <div className="glass-panel p-6 flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center mb-3">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Energy Status</h2>
        <p className="text-muted-foreground">Current battery status and recovery</p>
      </div>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Track Circle */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 256 256">
          <circle 
            cx="128" 
            cy="128" 
            r="120" 
            strokeWidth="12" 
            className="circle-progress"
            stroke={trackColor}
          />
        </svg>
        
        {/* Progress Circle */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 256 256">
          <circle 
            cx="128" 
            cy="128" 
            r="120" 
            strokeWidth="12" 
            className="circle-progress"
            stroke={progressColor}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        
        {/* Center content */}
        <div className="z-10 text-center">
          <div className="flex items-center justify-center mb-2">
            {batteryData.chargingRate > 0 ? (
              <BatteryCharging className="w-8 h-8 text-eco-green mr-2" />
            ) : (
              <Battery className="w-8 h-8 text-foreground mr-2" />
            )}
            <span className="text-5xl font-bold">{animatedCharge}%</span>
          </div>
          <p className="text-2xl font-medium text-foreground">{estimatedRange} km</p>
          <p className="text-sm text-muted-foreground">Estimated Range</p>
        </div>
      </div>
      
      <div className="mt-6 w-full grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Zap className="w-5 h-5 text-eco-blue mr-1" />
            <span className="text-2xl font-bold">{batteryData.energyRecovered} kWh</span>
          </div>
          <p className="text-sm text-muted-foreground">Energy Recovered</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold">+{batteryData.rangeExtension} km</span>
          </div>
          <p className="text-sm text-muted-foreground">Range Extension</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyMeter;
