'use client';

import React from 'react';
import { COACH_PERSONALITIES } from '@/app/lib/constants';
import { User, UserSquare2 } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface PersonalitySelectorProps {
  selectedPersonality: 'Masculin' | 'Féminin';
  onSelectPersonality: (personality: 'Masculin' | 'Féminin') => void;
  disabled?: boolean;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({
  selectedPersonality,
  onSelectPersonality,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4 border-b border-gray-800">
      <p className="text-sm text-gray-400 font-medium mr-2">Personnalité du coach:</p>
      
      <button
        onClick={() => onSelectPersonality('Masculin')}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          selectedPersonality === 'Masculin' 
            ? "bg-blue-600/30 text-blue-300 border border-blue-600/50" 
            : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
        )}
      >
        <User size={16} />
        <span>Masculin</span>
      </button>
      
      <button
        onClick={() => onSelectPersonality('Féminin')}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          selectedPersonality === 'Féminin' 
            ? "bg-pink-600/30 text-pink-300 border border-pink-600/50" 
            : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
        )}
      >
        <UserSquare2 size={16} />
        <span>Féminin</span>
      </button>
    </div>
  );
};

export default PersonalitySelector;