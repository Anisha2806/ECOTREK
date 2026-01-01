
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import SmartTips from '@/components/recommendations/SmartTips';
import { MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

interface BrakingZone {
  id: string;
  latitude: number;
  longitude: number;
  description: string;
  potential_recovery: string;
  recommendation: string;
}

const Recommendations = () => {
  const [query, setQuery] = useState('');
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);
  const [brakingZones, setBrakingZones] = useState<BrakingZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrakingZones = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('braking_zones')
          .select('*');
        
        if (error) {
          console.error('Error fetching braking zones:', error);
          toast({
            title: "Error fetching braking zones",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setBrakingZones(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrakingZones();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Smart Recommendations</h1>
          <p className="text-muted-foreground">
            AI-driven insights to improve your driving efficiency
          </p>
        </div>
        
        {/* Smart Tips Section */}
        <SmartTips />
        
        {/* Geo-tagged Braking Zones */}
        <div className="glass-panel p-6 mt-8 animate-fade-in">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-eco-blue mr-2" />
            <h2 className="text-2xl font-semibold">Optimal Braking Zones</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Locations where maximum energy recovery is possible
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : brakingZones.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No braking zones available at this time.
            </p>
          ) : (
            <div className="space-y-4">
              {brakingZones.map((zone) => (
                <div 
                  key={zone.id}
                  className="bg-white/40 dark:bg-white/5 rounded-xl p-4 border border-white/30 dark:border-white/10"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{zone.description}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Potential recovery: <span className="text-eco-green font-medium">{zone.potential_recovery}</span>
                      </p>
                    </div>
                    <button className="text-sm text-primary hover:underline">View on map</button>
                  </div>
                  <p className="text-sm mt-3">
                    <span className="font-medium">Tip:</span> {zone.recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Voice Assistant Interface */}
        <div className="glass-panel p-6 mt-8 animate-fade-in relative">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-6 h-6 text-eco-yellow mr-2" />
            <h2 className="text-2xl font-semibold">Voice Assistant</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Ask questions about your vehicle's performance or receive personalized tips
          </p>
          
          <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 rounded-l-lg py-3 px-4 bg-white/60 dark:bg-white/10 border border-white/30 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => setShowVoiceInterface(!showVoiceInterface)}
              className="bg-primary text-white rounded-r-lg py-3 px-4 hover:bg-primary/90 transition-colors"
            >
              {showVoiceInterface ? 'Type' : 'Voice'}
            </button>
          </div>
          
          {showVoiceInterface && (
            <div className="mt-6 p-8 bg-white/60 dark:bg-white/5 rounded-xl border border-white/30 dark:border-white/10 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-eco-blue rounded-full opacity-20 animate-pulse"></div>
                  </div>
                  <div className="relative z-10 w-12 h-12 bg-eco-blue rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-lg font-medium mb-2">Listening...</p>
              <p className="text-muted-foreground">
                Ask something like "How much energy did I save today?" or "Suggest ways to improve recovery"
              </p>
            </div>
          )}
          
          {/* Sample Responses (In a real app, these would be dynamically generated) */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-secondary/60 dark:bg-muted/60 rounded-xl">
              <p className="font-medium mb-1">How much energy did I save today?</p>
              <p className="text-muted-foreground">
                Today, you've saved 4.2 kWh through regenerative braking, which is equivalent to extending your range by approximately 14 km.
              </p>
            </div>
            
            <div className="p-4 bg-secondary/60 dark:bg-muted/60 rounded-xl">
              <p className="font-medium mb-1">What's my efficiency score?</p>
              <p className="text-muted-foreground">
                Your current eco-driving score is 87/100, which is 5 points higher than last week. Great improvement!
              </p>
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

export default Recommendations;
