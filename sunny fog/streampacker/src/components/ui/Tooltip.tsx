import { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type TooltipProps = {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'blue' | 'purple' | 'green' | 'orange';
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Tooltip({
  text,
  position = 'top',
  color = 'blue',
  children,
  className,
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDelayed, setIsDelayed] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Handle hover states with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setIsDelayed(false);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    setIsDelayed(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Position classes
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-1',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-1',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-1',
  };

  // Arrow position classes
  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-current border-x-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-current border-x-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-current border-y-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-current border-y-transparent',
  };

  // Color classes
  const colorClasses = {
    blue: 'text-cyan-400 border-cyan-500 bg-black/80',
    purple: 'text-purple-400 border-purple-500 bg-black/80',
    green: 'text-emerald-400 border-emerald-500 bg-black/80',
    orange: 'text-orange-400 border-orange-500 bg-black/80',
  };

  const colorArrowClasses = {
    blue: 'border-cyan-400',
    purple: 'border-purple-400',
    green: 'border-emerald-400',
    orange: 'border-orange-400',
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      
      <div
        ref={tooltipRef}
        className={cn(
          'absolute z-50 px-2 py-1 text-xs border text-center whitespace-nowrap',
          'opacity-0 pointer-events-none transition-all duration-200',
          'font-mono tracking-wide shadow-lg',
          positionClasses[position],
          colorClasses[color],
          {
            'opacity-100': isVisible,
            'blur-sm': isDelayed && isVisible,
            'blur-0': !isDelayed && isVisible,
          },
          className
        )}
      >
        {text}
        <div
          className={cn(
            'absolute w-0 h-0',
            'border-[4px]',
            arrowClasses[position],
            colorArrowClasses[color]
          )}
        />
      </div>
    </div>
  );
} 