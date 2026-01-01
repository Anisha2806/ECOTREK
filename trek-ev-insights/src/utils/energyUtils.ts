
import { EnergyInput, EnergySourceType, EmissionData, ChartData, TimeFilter } from '@/types';
import { format, subDays, subWeeks, subMonths, isAfter } from 'date-fns';

export const energySources = {
  EV: [
    { id: 'solar', name: 'Solar', type: 'Renewable', unit: 'kWh', icon: 'sun' },
    { id: 'wind', name: 'Wind', type: 'Renewable', unit: 'kWh', icon: 'wind' },
    { id: 'hydro', name: 'Hydro', type: 'Renewable', unit: 'kWh', icon: 'droplet' },
    { id: 'grid', name: 'Grid Electricity', type: 'NonRenewable', unit: 'kWh', icon: 'bolt' }
  ],
  Fuel: [
    { id: 'biofuel', name: 'Biofuel', type: 'Renewable', unit: 'L', icon: 'leaf' },
    { id: 'ethanol', name: 'Ethanol', type: 'Renewable', unit: 'L', icon: 'flask' },
    { id: 'gasoline', name: 'Gasoline', type: 'NonRenewable', unit: 'L', icon: 'fuel' },
    { id: 'diesel', name: 'Diesel', type: 'NonRenewable', unit: 'L', icon: 'truck' }
  ]
};

export const filterEnergyInputsByDate = (
  data: EnergyInput[],
  filter: TimeFilter
): EnergyInput[] => {
  const today = new Date();
  let filterDate: Date;

  switch (filter) {
    case 'daily':
      filterDate = subDays(today, 1);
      break;
    case 'weekly':
      filterDate = subDays(today, 7);
      break;
    case 'monthly':
      filterDate = subMonths(today, 1);
      break;
    case 'yearly':
      filterDate = subMonths(today, 12);
      break;
    default:
      filterDate = subDays(today, 7);
  }

  return data.filter(input => isAfter(new Date(input.date), filterDate));
};

export const calculateEnergyTotals = (
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

export const calculatePercentages = (
  renewable: number,
  nonRenewable: number
): { renewablePercentage: number; nonRenewablePercentage: number } => {
  const total = renewable + nonRenewable;
  
  if (total === 0) {
    return { renewablePercentage: 0, nonRenewablePercentage: 0 };
  }
  
  const renewablePercentage = (renewable / total) * 100;
  const nonRenewablePercentage = (nonRenewable / total) * 100;
  
  return {
    renewablePercentage: Math.round(renewablePercentage),
    nonRenewablePercentage: Math.round(nonRenewablePercentage)
  };
};

export const prepareChartData = (data: EnergyInput[]): ChartData[] => {
  const sourceMap = new Map<string, { value: number; type: EnergySourceType }>();
  
  data.forEach(input => {
    const existing = sourceMap.get(input.sourceName);
    if (existing) {
      existing.value += input.value;
    } else {
      sourceMap.set(input.sourceName, { value: input.value, type: input.sourceType });
    }
  });
  
  return Array.from(sourceMap).map(([name, { value, type }]) => ({
    name,
    value,
    type
  }));
};

export const calculateEmissions = (nonRenewableValue: number, unit: string): EmissionData => {
  // Simple calculation - in reality this would be more complex based on energy type
  const emissionFactor = unit === 'kWh' ? 0.4 : 2.3; // kgCO2/kWh or kgCO2/L
  const emissions = nonRenewableValue * emissionFactor;
  
  return {
    value: Math.round(emissions * 10) / 10,
    unit: 'kgCO2',
    equivalentTrees: Math.round(emissions / 21) // Average tree absorbs about 21 kgCO2 per year
  };
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
