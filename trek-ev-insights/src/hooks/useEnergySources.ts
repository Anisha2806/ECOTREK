
import { useState, useEffect } from 'react';
import { EnergySource, VehicleType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type EnergySourcesState = {
  EV: EnergySource[];
  Fuel: EnergySource[];
};

export const useEnergySources = () => {
  const [energySources, setEnergySources] = useState<EnergySourcesState>({ EV: [], Fuel: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchEnergySources = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('energy_sources')
          .select('*');
        
        if (error) throw error;
        
        // Group sources by vehicle type
        const sources = data.reduce(
          (acc, source) => {
            // Explicitly cast vehicle_type to VehicleType to ensure type safety
            const vehicleType = source.vehicle_type as VehicleType;
            
            const typedSource: EnergySource = {
              id: source.id,
              name: source.name,
              type: source.type as 'Renewable' | 'NonRenewable',
              unit: source.unit,
              vehicleType: vehicleType
            };
            
            if (vehicleType === 'EV') {
              acc.EV.push(typedSource);
            } else if (vehicleType === 'Fuel') {
              acc.Fuel.push(typedSource);
            }
            
            return acc;
          },
          { EV: [] as EnergySource[], Fuel: [] as EnergySource[] }
        );
        
        setEnergySources(sources);
      } catch (error) {
        console.error('Error fetching energy sources:', error);
        toast({
          title: "Error",
          description: "Failed to load energy sources. Please refresh the page.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnergySources();
  }, []);

  return { energySources, isLoading };
};
