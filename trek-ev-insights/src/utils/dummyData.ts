
// Dummy data for EV dashboard

// Battery data
export const batteryData = {
  currentCharge: 78, // percentage
  maxRange: 410, // km
  estimatedRange: 320, // km
  energyRecovered: 2.8, // kWh
  rangeExtension: 14, // km
  chargingRate: 37, // kW (when plugged in)
  efficiency: 85, // percentage
};

// Speed and braking data
export const speedData = {
  currentSpeed: 65, // km/h
  averageSpeed: 58, // km/h
  maxSpeed: 112, // km/h
  brakingIntensity: 0.4, // 0-1 scale
  recoveryEfficiency: 0.7, // 0-1 scale
  regenerativeTime: 32, // minutes
  mechanicalBrakeTime: 8, // minutes
};

// Quick stats data
export const statsData = {
  daily: {
    energySaved: 4.2, // kWh
    carbonReduction: 1.6, // kg
    distance: 87, // km
    efficiency: 92, // percentage
  },
  weekly: {
    energySaved: 31.5, // kWh
    carbonReduction: 12.2, // kg
    distance: 643, // km
    efficiency: 88, // percentage
  },
  monthly: {
    energySaved: 127.8, // kWh
    carbonReduction: 49.7, // kg
    distance: 2680, // km
    efficiency: 84, // percentage
  },
};

// Energy consumption chart data (last 7 days)
export const energyChartData = [
  { day: "Mon", consumed: 18.2, recovered: 3.8 },
  { day: "Tue", consumed: 16.7, recovered: 4.1 },
  { day: "Wed", consumed: 22.3, recovered: 5.2 },
  { day: "Thu", consumed: 15.9, recovered: 4.7 },
  { day: "Fri", consumed: 19.4, recovered: 4.9 },
  { day: "Sat", consumed: 12.8, recovered: 3.2 },
  { day: "Sun", consumed: 14.5, recovered: 3.8 },
];

// Energy source distribution
export const energySourceData = [
  { name: "Regenerative Braking", value: 28 },
  { name: "Home Charging", value: 45 },
  { name: "Public Charging", value: 22 },
  { name: "Solar", value: 5 },
];

// Braking behavior data
export const brakingData = [
  { time: "6am", regenerative: 80, mechanical: 20 },
  { time: "9am", regenerative: 65, mechanical: 35 },
  { time: "12pm", regenerative: 90, mechanical: 10 },
  { time: "3pm", regenerative: 75, mechanical: 25 },
  { time: "6pm", regenerative: 60, mechanical: 40 },
  { time: "9pm", regenerative: 85, mechanical: 15 },
];

// Efficiency trends data
export const trendData = {
  lastMonth: [
    { week: "Week 1", efficiency: 81 },
    { week: "Week 2", efficiency: 83 },
    { week: "Week 3", efficiency: 79 },
    { week: "Week 4", efficiency: 86 },
  ],
  seasonalImpact: {
    winter: -12, // percentage change in efficiency
    spring: 5,
    summer: 8,
    fall: 2,
  },
};

// Smart recommendations
export const recommendationsData = [
  {
    id: 1,
    type: "driving",
    title: "Reduce highway speed by 10km/h",
    description: "Lowering your highway speed from 120km/h to 110km/h can improve efficiency by up to 8%.",
    potentialSavings: "3.2 kWh per 100km",
    priority: "high",
  },
  {
    id: 2,
    type: "braking",
    title: "Anticipate stops earlier",
    description: "Begin slowing down earlier before intersections to maximize regenerative braking.",
    potentialSavings: "1.8 kWh per day",
    priority: "medium",
  },
  {
    id: 3,
    type: "climate",
    title: "Precondition while charging",
    description: "Use scheduled departure to warm or cool your car while still plugged in.",
    potentialSavings: "5.5 kWh per cold start",
    priority: "high",
  },
  {
    id: 4,
    type: "route",
    title: "Alternative route available",
    description: "A less hilly route is available that can improve efficiency.",
    potentialSavings: "2.1 kWh for current trip",
    priority: "medium",
  },
  {
    id: 5,
    type: "maintenance",
    title: "Check tire pressure",
    description: "Your tire pressure appears to be 15% below optimal, affecting efficiency.",
    potentialSavings: "4% overall efficiency",
    priority: "high",
  },
];

// Trip history data
export const tripHistoryData = [
  {
    id: 1,
    date: "2023-08-15",
    startTime: "08:15 AM",
    endTime: "09:02 AM",
    distance: 42.3,
    energyConsumed: 8.7,
    energyRecovered: 2.1,
    efficiency: 87,
    startLocation: "Home",
    endLocation: "Office",
  },
  {
    id: 2,
    date: "2023-08-15",
    startTime: "05:30 PM",
    endTime: "06:22 PM",
    distance: 44.5,
    energyConsumed: 9.2,
    energyRecovered: 2.4,
    efficiency: 82,
    startLocation: "Office",
    endLocation: "Home",
  },
  {
    id: 3,
    date: "2023-08-14",
    startTime: "07:55 AM",
    endTime: "08:50 AM",
    distance: 41.9,
    energyConsumed: 8.5,
    energyRecovered: 1.9,
    efficiency: 89,
    startLocation: "Home",
    endLocation: "Office",
  },
];

// Weather impact data
export const weatherImpactData = {
  temperature: -5, // percentage per 10°C below 20°C
  rain: -3, // percentage in heavy rain
  snow: -12, // percentage in snow
  wind: -2, // percentage per 10km/h headwind
};

// Optimal braking zones (geolocation data)
export const brakingZonesData = [
  {
    id: 1,
    latitude: 37.7749,
    longitude: -122.4194,
    description: "Steep downhill section",
    potentialRecovery: "High",
    recommendation: "Use regenerative braking exclusively",
  },
  {
    id: 2,
    latitude: 37.7833,
    longitude: -122.4167,
    description: "Approaching downtown traffic",
    potentialRecovery: "Medium",
    recommendation: "Begin slowing 200m before traffic",
  },
  {
    id: 3,
    latitude: 37.7850,
    longitude: -122.4100,
    description: "Long descent on highway exit",
    potentialRecovery: "High",
    recommendation: "Reduce speed before exit ramp",
  },
];
