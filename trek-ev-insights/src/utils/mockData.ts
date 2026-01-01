
import { EnergyInput, EnergyGoal } from '@/types';
import { generateUniqueId } from './energyUtils';
import { subDays, format } from 'date-fns';

const today = new Date();

export const mockEnergyInputs: EnergyInput[] = [
  {
    id: generateUniqueId(),
    sourceId: 'solar',
    sourceName: 'Solar',
    sourceType: 'Renewable',
    value: 12.5,
    unit: 'kWh',
    date: format(today, 'yyyy-MM-dd'),
    vehicleType: 'EV'
  },
  {
    id: generateUniqueId(),
    sourceId: 'wind',
    sourceName: 'Wind',
    sourceType: 'Renewable',
    value: 8.3,
    unit: 'kWh',
    date: format(today, 'yyyy-MM-dd'),
    vehicleType: 'EV'
  },
  {
    id: generateUniqueId(),
    sourceId: 'grid',
    sourceName: 'Grid Electricity',
    sourceType: 'NonRenewable',
    value: 15.7,
    unit: 'kWh',
    date: format(today, 'yyyy-MM-dd'),
    vehicleType: 'EV'
  },
  {
    id: generateUniqueId(),
    sourceId: 'solar',
    sourceName: 'Solar',
    sourceType: 'Renewable',
    value: 10.2,
    unit: 'kWh',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    vehicleType: 'EV'
  },
  {
    id: generateUniqueId(),
    sourceId: 'grid',
    sourceName: 'Grid Electricity',
    sourceType: 'NonRenewable',
    value: 18.1,
    unit: 'kWh',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    vehicleType: 'EV'
  },
  {
    id: generateUniqueId(),
    sourceId: 'biofuel',
    sourceName: 'Biofuel',
    sourceType: 'Renewable',
    value: 5.6,
    unit: 'L',
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    vehicleType: 'Fuel'
  },
  {
    id: generateUniqueId(),
    sourceId: 'gasoline',
    sourceName: 'Gasoline',
    sourceType: 'NonRenewable',
    value: 12.3,
    unit: 'L',
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    vehicleType: 'Fuel'
  },
  {
    id: generateUniqueId(),
    sourceId: 'ethanol',
    sourceName: 'Ethanol',
    sourceType: 'Renewable',
    value: 3.8,
    unit: 'L',
    date: format(subDays(today, 3), 'yyyy-MM-dd'),
    vehicleType: 'Fuel'
  },
  {
    id: generateUniqueId(),
    sourceId: 'diesel',
    sourceName: 'Diesel',
    sourceType: 'NonRenewable',
    value: 10.5,
    unit: 'L',
    date: format(subDays(today, 4), 'yyyy-MM-dd'),
    vehicleType: 'Fuel'
  },
  {
    id: generateUniqueId(),
    sourceId: 'solar',
    sourceName: 'Solar',
    sourceType: 'Renewable',
    value: 9.7,
    unit: 'kWh',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    vehicleType: 'EV'
  },
  {
    id: generateUniqueId(),
    sourceId: 'wind',
    sourceName: 'Wind',
    sourceType: 'Renewable',
    value: 7.9,
    unit: 'kWh',
    date: format(subDays(today, 6), 'yyyy-MM-dd'),
    vehicleType: 'EV'
  }
];

export const mockEnergyGoal: EnergyGoal = {
  id: generateUniqueId(),
  targetPercentage: 75,
  currentPercentage: 62,
  startDate: format(subDays(today, 30), 'yyyy-MM-dd'),
  endDate: format(subDays(today, -30), 'yyyy-MM-dd'),
  description: 'Increase renewable energy usage to 75%'
};
