
import React, { useState, useEffect } from 'react';
import { 
  LightbulbIcon, ChevronRight, BatteryMedium, 
  ThermometerSun, MapPin, Bell, Settings,
  Loader2
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Recommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  potential_savings: string;
  priority: string;
  is_implemented?: boolean;
}

const SmartTips = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('recommendations')
          .select('*')
          .order('priority', { ascending: false });
        
        if (error) {
          console.error('Error fetching recommendations:', error);
          toast({
            title: "Error fetching recommendations",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setRecommendations(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Get icon based on recommendation type
  const getIcon = (type: string) => {
    switch (type) {
      case 'driving':
        return <BatteryMedium className="w-6 h-6" />;
      case 'climate':
        return <ThermometerSun className="w-6 h-6" />;
      case 'braking':
        return <Bell className="w-6 h-6" />;
      case 'route':
        return <MapPin className="w-6 h-6" />;
      case 'maintenance':
        return <Settings className="w-6 h-6" />;
      default:
        return <LightbulbIcon className="w-6 h-6" />;
    }
  };
  
  // Get priority styling
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-eco-red text-white';
      case 'medium':
        return 'bg-eco-yellow text-foreground';
      default:
        return 'bg-eco-blue text-white';
    }
  };
  
  if (isLoading) {
    return (
      <div className="glass-panel p-6 animate-fade-in flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (recommendations.length === 0) {
    return (
      <div className="glass-panel p-6 animate-fade-in">
        <div className="flex items-center mb-6">
          <LightbulbIcon className="w-6 h-6 text-eco-yellow mr-2" />
          <h2 className="text-2xl font-semibold">Smart Recommendations</h2>
        </div>
        <p className="text-muted-foreground text-center py-8">
          No recommendations available at this time.
        </p>
      </div>
    );
  }
  
  return (
    <div className="glass-panel p-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <LightbulbIcon className="w-6 h-6 text-eco-yellow mr-2" />
        <h2 className="text-2xl font-semibold">Smart Recommendations</h2>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div 
            key={recommendation.id}
            className="bg-white/40 dark:bg-white/5 rounded-xl overflow-hidden transition-all duration-300 shadow-sm border border-white/30 dark:border-white/10"
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(recommendation.id)}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-secondary dark:bg-muted mr-3">
                  {getIcon(recommendation.type)}
                </div>
                <div>
                  <h3 className="font-medium">{recommendation.title}</h3>
                  <div className="flex items-center mt-1">
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyle(recommendation.priority)}`}
                    >
                      {recommendation.priority}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      Potential savings: {recommendation.potential_savings}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  expandedId === recommendation.id ? 'rotate-90' : ''
                }`} 
              />
            </div>
            
            {expandedId === recommendation.id && (
              <div className="px-4 pb-4 pt-0 border-t border-border/30">
                <p className="text-sm text-foreground my-2">
                  {recommendation.description}
                </p>
                <button className="mt-2 text-sm font-medium text-primary hover:underline flex items-center">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartTips;
