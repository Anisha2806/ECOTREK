
import React, { useState } from 'react';
import { EnergyGoal } from '@/types';
import { generateUniqueId } from '@/utils/energyUtils';
import { toast } from '@/hooks/use-toast';

interface GoalSettingProps {
  onSetGoal: (goal: EnergyGoal) => void;
  currentGoal: EnergyGoal | null;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ onSetGoal, currentGoal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [targetPercentage, setTargetPercentage] = useState(currentGoal?.targetPercentage || 75);
  const [description, setDescription] = useState(currentGoal?.description || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (targetPercentage <= 0 || targetPercentage > 100) {
      toast({
        title: "Invalid Goal",
        description: "Goal percentage must be between 1 and 100",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30); // Default to 30 days
    
    const newGoal: EnergyGoal = {
      id: currentGoal?.id || generateUniqueId(),
      targetPercentage,
      currentPercentage: currentGoal?.currentPercentage || 0,
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      description
    };
    
    onSetGoal(newGoal);
    setIsEditing(false);
    
    toast({
      title: "Goal Updated",
      description: `Your renewable energy goal is now set to ${targetPercentage}%`
    });
  };

  if (!isEditing && currentGoal) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Your Current Goal</h3>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary hover:underline"
          >
            Edit
          </button>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-4">
          <p className="text-sm mb-1">
            <span className="font-medium">Target:</span> {currentGoal.targetPercentage}% renewable energy
          </p>
          {currentGoal.description && (
            <p className="text-sm text-muted-foreground">{currentGoal.description}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Set Renewable Energy Goal</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="goalPercentage" className="text-sm font-medium">
            Target Percentage
          </label>
          <div className="flex items-center">
            <input
              id="goalPercentage"
              type="number"
              min="1"
              max="100"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(parseInt(e.target.value))}
              className="input-control"
            />
            <span className="ml-2">%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Set a realistic goal for your renewable energy usage
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="goalDescription" className="text-sm font-medium">
            Goal Description (Optional)
          </label>
          <textarea
            id="goalDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Increase solar usage this month"
            className="input-control min-h-[80px]"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 btn-primary"
          >
            Save Goal
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GoalSetting;
