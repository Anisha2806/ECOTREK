
import React, { useState, useEffect } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import EnergySourceInput from './EnergySourceInput';
import EnergyUsageChart from './charts/EnergyUsageChart';
import ProgressChart from './charts/ProgressChart';
import GoalSetting from './GoalSetting';
import DataExport from './DataExport';
import EnergyInsights from './EnergyInsights';
import { EnergyInput, EnergyGoal, TimeFilter, ChartData } from '@/types';
import { filterEnergyInputsByDate, prepareChartData } from '@/utils/energyUtils';
import { mockEnergyInputs, mockEnergyGoal } from '@/utils/mockData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const timeFilterOptions: { value: TimeFilter; label: string }[] = [
  { value: 'daily', label: 'Today' },
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' }
];

const Dashboard: React.FC = () => {
  const [energyInputs, setEnergyInputs] = useState<EnergyInput[]>([]);
  const [goal, setGoal] = useState<EnergyGoal | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [filteredData, setFilteredData] = useState<EnergyInput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch energy inputs from Supabase
  useEffect(() => {
    const fetchEnergyInputs = async () => {
      setIsLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        // Use mock data if not authenticated
        setEnergyInputs(mockEnergyInputs);
        setGoal(mockEnergyGoal);
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch energy inputs from Supabase
        const { data: energyInputsData, error: energyInputsError } = await supabase
          .from('energy_inputs')
          .select(`
            id,
            value,
            date,
            energy_sources (
              id,
              name,
              type,
              unit,
              vehicle_type
            )
          `)
          .order('date', { ascending: false });
        
        if (energyInputsError) throw energyInputsError;
        
        // Transform the data to match our EnergyInput type
        const transformedInputs: EnergyInput[] = energyInputsData.map(input => ({
          id: input.id,
          sourceId: input.energy_sources.id,
          sourceName: input.energy_sources.name,
          sourceType: input.energy_sources.type as 'Renewable' | 'NonRenewable',
          value: input.value,
          unit: input.energy_sources.unit,
          date: input.date,
          vehicleType: input.energy_sources.vehicle_type as 'EV' | 'Fuel'
        }));
        
        setEnergyInputs(transformedInputs);
        
        // Fetch energy goal from Supabase
        const { data: energyGoalsData, error: energyGoalsError } = await supabase
          .from('energy_goals')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (energyGoalsError) throw energyGoalsError;
        
        if (energyGoalsData && energyGoalsData.length > 0) {
          // Calculate current percentage based on recent data
          const { renewable, nonRenewable } = calculateEnergyTotals(transformedInputs);
          const total = renewable + nonRenewable;
          const currentPercentage = total > 0 ? Math.round((renewable / total) * 100) : 0;
          
          setGoal({
            id: energyGoalsData[0].id,
            targetPercentage: energyGoalsData[0].target_percentage,
            currentPercentage,
            startDate: energyGoalsData[0].start_date,
            endDate: energyGoalsData[0].end_date,
            description: energyGoalsData[0].description
          });
        } else {
          setGoal(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Failed to load data",
          description: "There was an error loading your energy data. Using sample data instead.",
          variant: "destructive"
        });
        
        // Fall back to mock data on error
        setEnergyInputs(mockEnergyInputs);
        setGoal(mockEnergyGoal);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnergyInputs();
  }, []);
  
  // Calculate energy totals (moved from energyUtils.ts)
  const calculateEnergyTotals = (
    data: EnergyInput[]
  ): { renewable: number; nonRenewable: number } => {
    return data.reduce(
      (acc, input) => {
        if (input.sourceType === 'Renewable') {
          acc.renewable += input.value;
        } else {
          acc.nonRenewable += input.value;
        }
        return acc;
      },
      { renewable: 0, nonRenewable: 0 }
    );
  };
  
  useEffect(() => {
    // Apply time filter to data
    const filtered = filterEnergyInputsByDate(energyInputs, timeFilter);
    setFilteredData(filtered);
    
    // Prepare chart data
    const prepared = prepareChartData(filtered);
    setChartData(prepared);
  }, [energyInputs, timeFilter]);
  
  const handleAddEnergyInput = async (newInput: EnergyInput) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save your energy inputs.",
          variant: "destructive"
        });
        
        // Add to local state but don't persist
        setEnergyInputs(prev => [newInput, ...prev]);
        return;
      }
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('energy_inputs')
        .insert({
          source_id: newInput.sourceId,
          value: newInput.value,
          date: newInput.date,
          user_id: session.session.user.id
        })
        .select(`
          id,
          value,
          date,
          energy_sources (
            id,
            name,
            type,
            unit,
            vehicle_type
          )
        `)
        .single();
      
      if (error) throw error;
      
      // Transform the returned data
      const transformedInput: EnergyInput = {
        id: data.id,
        sourceId: data.energy_sources.id,
        sourceName: data.energy_sources.name,
        sourceType: data.energy_sources.type as 'Renewable' | 'NonRenewable',
        value: data.value,
        unit: data.energy_sources.unit,
        date: data.date,
        vehicleType: data.energy_sources.vehicle_type as 'EV' | 'Fuel'
      };
      
      // Update state with the newly created input
      setEnergyInputs(prev => [transformedInput, ...prev]);
      
      toast({
        title: "Energy Input Saved",
        description: `Added ${newInput.value} ${newInput.unit} of ${newInput.sourceName}`,
      });
    } catch (error) {
      console.error('Error adding energy input:', error);
      toast({
        title: "Error",
        description: "Failed to save energy input. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleSetGoal = async (newGoal: EnergyGoal) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save your energy goals.",
          variant: "destructive"
        });
        
        // Update local state but don't persist
        setGoal(newGoal);
        return;
      }
      
      // Insert or update goal in Supabase
      const { error } = await supabase
        .from('energy_goals')
        .upsert({
          id: newGoal.id.includes('mock') ? undefined : newGoal.id, // Don't use mock IDs
          user_id: session.session.user.id,
          target_percentage: newGoal.targetPercentage,
          start_date: newGoal.startDate,
          end_date: newGoal.endDate,
          description: newGoal.description
        });
      
      if (error) throw error;
      
      // Update local state
      setGoal(newGoal);
      
      toast({
        title: "Goal Updated",
        description: `Your renewable energy goal is now set to ${newGoal.targetPercentage}%`
      });
    } catch (error) {
      console.error('Error setting goal:', error);
      toast({
        title: "Error",
        description: "Failed to save your goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight mb-2 animate-fade-in">
          Energy Dashboard
        </h1>
        <p className="text-muted-foreground animate-fade-in delay-100">
          Track, visualize, and optimize your vehicle's energy consumption
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 animate-fade-in">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <div className="relative inline-block">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              className="appearance-none bg-transparent pr-8 py-1 focus:outline-none text-sm font-medium border-b border-input"
            >
              {timeFilterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Energy Insights Cards */}
          <EnergyInsights 
            data={filteredData} 
            timeFilter={timeFilterOptions.find(t => t.value === timeFilter)?.label || 'Current'}
          />
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Energy Usage Chart */}
            <div className="dashboard-card p-6 h-96 animate-scale-up">
              <h2 className="text-lg font-medium mb-4">Energy Distribution</h2>
              <EnergyUsageChart data={chartData} />
            </div>
            
            {/* Goals and Progress */}
            <div className="dashboard-card p-6 h-96 animate-scale-up">
              <h2 className="text-lg font-medium mb-4">Goals & Progress</h2>
              {goal && <ProgressChart goal={goal} />}
              <div className="mt-6">
                <GoalSetting onSetGoal={handleSetGoal} currentGoal={goal} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Energy Source Input */}
          <EnergySourceInput onAddEnergyInput={handleAddEnergyInput} />
          
          {/* Data Export */}
          <DataExport data={energyInputs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
