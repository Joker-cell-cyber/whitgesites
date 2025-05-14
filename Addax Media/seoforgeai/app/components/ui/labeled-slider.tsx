'use client';

import React from 'react';

interface LabeledSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
  centerLabel?: string;
  labels?: { value: number; label: string; }[];
  formatValue?: (value: number) => string;
  className?: string;
}

export function LabeledSlider({
  min,
  max,
  step,
  value,
  onChange,
  leftLabel = '',
  rightLabel = '',
  centerLabel,
  labels,
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
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <span className="text-slate-800 font-medium min-w-[100px] text-center">
          {formatValue(value)}
        </span>
      </div>
      {labels ? (
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          {labels.map((label) => (
            <div key={label.value} className="flex flex-col items-center" style={{ position: 'relative', left: `${((label.value - min) / (max - min)) * 100}%`, transform: 'translateX(-50%)' }}>
              <span>{label.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>{leftLabel}</span>
          {centerLabel && <span>{centerLabel}</span>}
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
} 