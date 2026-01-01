
import React from 'react';
import { EnergyInput } from '@/types';
import { useEnergySources } from '@/hooks/useEnergySources';
import EnergySourceForm from './EnergySourceForm';
import EnergySourceLoading from './EnergySourceLoading';

interface EnergySourceInputProps {
  onAddEnergyInput: (input: EnergyInput) => void;
}

const EnergySourceInput: React.FC<EnergySourceInputProps> = ({ onAddEnergyInput }) => {
  const { energySources, isLoading } = useEnergySources();

  return (
    <div className="dashboard-card p-6 animate-scale-up">
      <h2 className="text-lg font-medium mb-4">Add Energy Source</h2>
      
      {isLoading ? (
        <EnergySourceLoading />
      ) : (
        <EnergySourceForm 
          onAddEnergyInput={onAddEnergyInput} 
          energySources={energySources} 
        />
      )}
    </div>
  );
};

export default EnergySourceInput;
