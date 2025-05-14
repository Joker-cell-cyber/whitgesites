'use client';

import React from 'react';
import { Checkbox } from './checkbox';

interface CheckboxOption {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  values: Record<string, boolean> | string[];
  onChange: (id: string, checked: boolean) => void;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function CheckboxGroup({
  options,
  values,
  onChange,
  columns = 2,
  className = ''
}: CheckboxGroupProps) {
  // Fonction pour déterminer si une option est cochée
  const isChecked = (id: string): boolean => {
    if (Array.isArray(values)) {
      return values.includes(id);
    } else {
      return values[id] || false;
    }
  };

  return (
    <div className={`grid grid-cols-1 ${
      columns === 2 ? 'md:grid-cols-2' : 
      columns === 3 ? 'md:grid-cols-3' : 
      columns === 4 ? 'md:grid-cols-4' : ''
    } gap-2 ${className}`}>
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox 
            id={`checkbox-${option.id}`}
            checked={isChecked(option.id)}
            onCheckedChange={(checked) => 
              onChange(option.id, checked as boolean)
            }
          />
          <label 
            htmlFor={`checkbox-${option.id}`}
            className="text-sm text-slate-700 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
} 