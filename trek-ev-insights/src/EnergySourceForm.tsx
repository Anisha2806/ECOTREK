
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { VehicleType, EnergyInput, EnergySource } from '@/types';
import { generateUniqueId } from '@/utils/energyUtils';
import { toast } from '@/hooks/use-toast';

interface EnergySourceFormProps {
  onAddEnergyInput: (input: EnergyInput) => void;
  energySources: {
    EV: EnergySource[];
    Fuel: EnergySource[];
  };
}

const EnergySourceForm: React.FC<EnergySourceFormProps> = ({ onAddEnergyInput, energySources }) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('EV');
  const [sourceId, setSourceId] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sourceId || !value || parseFloat(value) <= 0) {
      toast({
        title: "Validation Error",
        description: "Please select an energy source and enter a valid value.",
        variant: "destructive"
      });
      return;
    }
    
    const availableSources = [...(energySources.EV || []), ...(energySources.Fuel || [])];
    const selectedSource = availableSources.find(s => s.id === sourceId);
    
    if (!selectedSource) {
      toast({
        title: "Error",
        description: "Selected energy source not found.",
        variant: "destructive"
      });
      return;
    }
    
    const newEnergyInput: EnergyInput = {
      id: generateUniqueId(),
      sourceId,
      sourceName: selectedSource.name,
      sourceType: selectedSource.type as 'Renewable' | 'NonRenewable',
      value: parseFloat(value),
      unit: selectedSource.unit,
      date,
      vehicleType: selectedSource.vehicleType as 'EV' | 'Fuel'
    };
    
    onAddEnergyInput(newEnergyInput);
    
    // Reset form
    setValue('');
  };

  const availableSources = energySources[vehicleType] || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="vehicleType" className="text-sm font-medium">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value as VehicleType);
              setSourceId(''); // Reset source when vehicle type changes
            }}
            className="input-control"
          >
            <option value="EV">Electric Vehicle</option>
            <option value="Fuel">Fuel Vehicle</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="energySource" className="text-sm font-medium">
            Energy Source
          </label>
          <select
            id="energySource"
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="input-control"
          >
            <option value="">Select an energy source</option>
            <optgroup label="Renewable">
              {availableSources
                .filter(source => source.type === 'Renewable')
                .map(source => (
                  <option key={source.id} value={source.id}>
                    {source.name} ({source.unit})
                  </option>
                ))}
            </optgroup>
            <optgroup label="Non-Renewable">
              {availableSources
                .filter(source => source.type === 'NonRenewable')
                .map(source => (
                  <option key={source.id} value={source.id}>
                    {source.name} ({source.unit})
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="value" className="text-sm font-medium">
            Value
          </label>
          <input
            id="value"
            type="number"
            step="0.1"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="input-control"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-control"
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add Energy Input</span>
      </button>
    </form>
  );
};

export default EnergySourceForm;
