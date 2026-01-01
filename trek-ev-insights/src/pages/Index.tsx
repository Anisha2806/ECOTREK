
import React from 'react';
import Header from '@/components/layout/Header';
import EnergyMeter from '@/components/dashboard/EnergyMeter';
import Speedometer from '@/components/dashboard/Speedometer';
import QuickStats from '@/components/dashboard/QuickStats';
import SmartTips from '@/components/recommendations/SmartTips';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">EV Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your electric vehicle's performance in real-time
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <EnergyMeter />
          <Speedometer />
        </div>
        
        <QuickStats />
        
        <div className="mt-8">
          <SmartTips />
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

export default Index;
