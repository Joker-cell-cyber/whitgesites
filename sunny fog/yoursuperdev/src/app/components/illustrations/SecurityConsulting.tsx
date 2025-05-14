import React from 'react';
import { motion } from 'framer-motion';

interface SecurityConsultingProps {
  width?: number;
  height?: number;
  className?: string;
}

const SecurityConsulting: React.FC<SecurityConsultingProps> = ({
  width = 80,
  height = 80,
  className = '',
}) => {
  return (
    <div className={`${className}`} style={{ width, height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bouclier principal */}
        <motion.path
          d="M40 10L15 20V37.5C15 53.5 25.5 65 40 70C54.5 65 65 53.5 65 37.5V20L40 10Z"
          fill="#DC2626"
          fillOpacity="0.1"
          stroke="#DC2626"
          strokeWidth="2.5"
          strokeLinejoin="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Verrou */}
        <motion.rect
          x="30"
          y="35"
          width="20"
          height="15"
          rx="2"
          fill="#DC2626"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        
        <motion.rect
          x="36"
          y="25"
          width="8"
          height="15"
          rx="4"
          stroke="#DC2626"
          strokeWidth="2.5"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
        
        {/* Trou de serrure */}
        <motion.circle
          cx="40"
          cy="40"
          r="2.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2 }}
        />
        <motion.path
          d="M40 42.5V45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 2.1 }}
          style={{ transformOrigin: '40px 42.5px' }}
        />
        
        {/* Scan de sécurité */}
        <motion.path
          d="M25 55C25 55 30 60 40 60C50 60 55 55 55 55"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ 
            pathLength: { duration: 0.8, delay: 2.3 },
            opacity: { duration: 1.6, delay: 2.3, repeat: Infinity, repeatDelay: 1 }
          }}
        />
        
        <motion.path
          d="M20 50C20 50 28 65 40 65C52 65 60 50 60 50"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ 
            pathLength: { duration: 0.8, delay: 2.5 },
            opacity: { duration: 1.6, delay: 2.5, repeat: Infinity, repeatDelay: 1 }
          }}
        />
        
        {/* Points de surveillance */}
        <motion.circle
          cx="15"
          cy="30"
          r="2.5"
          fill="#F87171"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 3 }}
        />
        
        <motion.circle
          cx="65"
          cy="30"
          r="2.5"
          fill="#F87171"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 3.2 }}
        />
        
        <motion.circle
          cx="40"
          cy="10"
          r="2.5"
          fill="#F87171"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 3.4 }}
        />
      </svg>
    </div>
  );
};

export default SecurityConsulting;