
export type VehicleType = 'EV' | 'Fuel';

export type EnergySourceType = 'Renewable' | 'NonRenewable';

export interface EnergySource {
  id: string;
  name: string;
  type: EnergySourceType;
  unit: string;
  vehicleType: VehicleType;
  icon?: string;
  description?: string;
}

export interface EnergyInput {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceType: EnergySourceType;
  value: number;
  unit: string;
  date: string;
  vehicleType: VehicleType;
}

export interface EnergyGoal {
  id: string;
  targetPercentage: number;
  currentPercentage: number;
  startDate: string;
  endDate: string;
  description?: string;
}

export type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ChartData {
  name: string;
  value: number;
  type: EnergySourceType;
}

export interface EmissionData {
  value: number;
  unit: string;
  equivalentTrees: number;
}
