'use client';

import React from 'react';

interface LabeledSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  centerLabel?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function LabeledSlider({
  min,
  max,
  step,
  value,
  onChange,
  leftLabel,
  rightLabel,
  centerLabel,
  formatValue = (val) => val.toString(),
  className = ''
}: LabeledSliderProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <span className="text-white font-medium min-w-[100px] text-center">
          {formatValue(value)}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{leftLabel}</span>
        {centerLabel && <span>{centerLabel}</span>}
        <span>{rightLabel}</span>
      </div>
    </div>
  );
} 