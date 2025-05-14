"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';

type DataPoint = {
  sessionIndex: number;
  winRate: number;
};

type PokerGraphProps = {
  data: DataPoint[];
  height?: number;
  width?: number;
  lineColor?: string;
  backgroundColor?: string;
  showGrid?: boolean;
  title?: string;
  duration?: number;
  formatValue?: (value: number) => string;
  className?: string;
};

export default function PokerGraph({
  data,
  height = 200,
  width = 400,
  lineColor = "#d4af37", // Chip gold
  backgroundColor = "rgba(10, 46, 54, 0.1)", // Felt green with transparency
  showGrid = true,
  title,
  duration = 1.5,
  formatValue = (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}bb/100`,
  className = '',
}: PokerGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate min and max values
  const minWinRate = Math.min(...data.map(d => d.winRate));
  const maxWinRate = Math.max(...data.map(d => d.winRate));
  
  // Add padding to min/max
  const yMin = Math.floor(minWinRate - 2);
  const yMax = Math.ceil(maxWinRate + 2);

  // Create path data for the graph line
  const getPathD = () => {
    if (data.length === 0) return '';
    
    const totalPoints = data.length;
    const xStep = width / (totalPoints - 1);
    
    const yRange = yMax - yMin;
    const yScale = height / yRange;
    
    return data.map((point, i) => {
      const x = i * xStep;
      // Invert y-axis since SVG coordinates go from top to bottom
      const y = height - ((point.winRate - yMin) * yScale);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  // Create path for area under the graph
  const getAreaPathD = () => {
    if (data.length === 0) return '';
    
    const totalPoints = data.length;
    const xStep = width / (totalPoints - 1);
    
    const yRange = yMax - yMin;
    const yScale = height / yRange;
    
    let path = data.map((point, i) => {
      const x = i * xStep;
      // Invert y-axis since SVG coordinates go from top to bottom
      const y = height - ((point.winRate - yMin) * yScale);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
    
    // Complete the path by drawing to the bottom right, then bottom left, then back to start
    const lastX = (totalPoints - 1) * xStep;
    path += ` L ${lastX},${height} L 0,${height} Z`;
    
    return path;
  };

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      {title && <h3 className="text-lg font-medium mb-2 font-montserrat">{title}</h3>}
      
      <div className="relative bg-felt-900/30 p-4 rounded-lg border border-felt-800/50">
        <svg 
          ref={svgRef} 
          viewBox={`0 0 ${width} ${height}`} 
          width="100%" 
          height="100%" 
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {showGrid && (
            <g className="grid-lines text-gray-700/20">
              {/* Horizontal grid lines */}
              {Array.from({ length: 5 }, (_, i) => {
                const y = height / 4 * i;
                return (
                  <line 
                    key={`h-${i}`} 
                    x1="0" 
                    y1={y} 
                    x2={width} 
                    y2={y} 
                    strokeWidth="1"
                    stroke="currentColor" 
                  />
                );
              })}
              
              {/* Vertical grid lines */}
              {Array.from({ length: 5 }, (_, i) => {
                const x = width / 4 * i;
                return (
                  <line 
                    key={`v-${i}`} 
                    x1={x} 
                    y1="0" 
                    x2={x} 
                    y2={height} 
                    strokeWidth="1"
                    stroke="currentColor" 
                  />
                );
              })}
            </g>
          )}
          
          {/* Area under the graph */}
          <motion.path
            d={getAreaPathD()}
            fill={backgroundColor}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: duration * 0.8, ease: "easeInOut" }}
          />
          
          {/* The graph line */}
          <motion.path
            d={getPathD()}
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: duration, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const totalPoints = data.length;
            const xStep = width / (totalPoints - 1);
            const x = index * xStep;
            
            const yRange = yMax - yMin;
            const yScale = height / yRange;
            const y = height - ((point.winRate - yMin) * yScale);
            
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r={3}
                fill={point.winRate >= 0 ? "#d4af37" : "#b22222"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (duration / totalPoints) * index,
                  duration: 0.3
                }}
              />
            );
          })}
        </svg>
        
        {/* Current win rate display */}
        {data.length > 0 && (
          <div className="absolute top-2 right-2 bg-gray-900/80 py-1 px-3 rounded-full text-sm font-roboto-mono">
            Current: <span className={data[data.length - 1].winRate >= 0 ? "text-chip-gold-500" : "text-poker-red-500"}>
              {formatValue(data[data.length - 1].winRate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 