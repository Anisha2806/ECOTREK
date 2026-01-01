
import React, { useEffect, useState } from 'react';
import { Gauge, ArrowDown } from 'lucide-react';
import { speedData } from '@/utils/dummyData';

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [recoveryEfficiency, setRecoveryEfficiency] = useState(0);
  const maxSpeed = 200; // Maximum speed on the gauge
  
  useEffect(() => {
    // Animate speed gauge
    const speedInterval = setInterval(() => {
      setSpeed(prev => {
        if (prev < speedData.currentSpeed) {
          return prev + 2;
        }
        clearInterval(speedInterval);
        return prev;
      });
    }, 30);
    
    // Animate recovery efficiency
    const recoveryInterval = setInterval(() => {
      setRecoveryEfficiency(prev => {
        if (prev < speedData.recoveryEfficiency) {
          return prev + 0.02;
        }
        clearInterval(recoveryInterval);
        return prev;
      });
    }, 30);
    
    return () => {
      clearInterval(speedInterval);
      clearInterval(recoveryInterval);
    };
  }, []);
  
  // Calculate speedometer rotation and styling
  const speedRotation = (speed / maxSpeed) * 180 - 90; // -90 to 90 degrees
  
  // Determine recovery efficiency color
  const efficiencyColor = 
    recoveryEfficiency > 0.7 ? '#3DDB85' : 
    recoveryEfficiency > 0.4 ? '#FFD166' : 
    '#EF476F';
  
  // Convert brakingIntensity to a readable format
  const brakingIntensityText = 
    speedData.brakingIntensity < 0.3 ? 'Light' : 
    speedData.brakingIntensity < 0.7 ? 'Moderate' : 
    'Heavy';
  
  return (
    <div className="glass-panel p-6 flex flex-col items-center animate-fade-in">
      <div className="text-center mb-3">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Driving Metrics</h2>
        <p className="text-muted-foreground">Current speed and braking efficiency</p>
      </div>
      
      <div className="relative w-56 h-32 mt-2">
        {/* Speedometer background */}
        <div className="absolute w-full h-full overflow-hidden">
          <div className="absolute w-[200%] h-[200%] left-[-50%] bottom-0 border-[16px] border-secondary dark:border-muted rounded-full"></div>
        </div>
        
        {/* Speedometer markers */}
        {[...Array(11)].map((_, i) => {
          const rotation = (i / 10) * 180 - 90;
          return (
            <div 
              key={i} 
              className="absolute bottom-0 left-1/2 h-full w-[2px] origin-bottom" 
              style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            >
              <div className={`h-[10px] w-full ${i % 5 === 0 ? 'bg-foreground' : 'bg-muted-foreground'}`}></div>
              {i % 5 === 0 && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs text-muted-foreground">
                  {i * (maxSpeed / 10)}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Speedometer needle */}
        <div 
          className="absolute bottom-0 left-1/2 h-[90%] w-[4px] bg-primary origin-bottom transform -translate-x-1/2 transition-transform duration-300 ease-in-out" 
          style={{ transform: `translateX(-50%) rotate(${speedRotation}deg)` }}
        >
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Current speed display */}
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-3xl font-bold">{Math.round(speed)}</span>
          <span className="text-sm ml-1">km/h</span>
        </div>
      </div>
      
      <div className="mt-6 w-full grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <ArrowDown 
              className="w-5 h-5 mr-1" 
              style={{ color: efficiencyColor }}
            />
            <span className="text-xl font-semibold">{brakingIntensityText}</span>
          </div>
          <p className="text-sm text-muted-foreground">Braking Intensity</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div 
              className="w-12 h-3 rounded-full overflow-hidden bg-muted"
              aria-label={`Recovery efficiency: ${Math.round(recoveryEfficiency * 100)}%`}
            >
              <div 
                className="h-full" 
                style={{ 
                  width: `${recoveryEfficiency * 100}%`,
                  backgroundColor: efficiencyColor
                }}
              ></div>
            </div>
            <span className="ml-2 text-lg font-medium">
              {Math.round(recoveryEfficiency * 100)}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Recovery Efficiency</p>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;
