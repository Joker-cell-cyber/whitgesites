import React from 'react';
import { motion } from 'framer-motion';

interface DataManagementProps {
  width?: number;
  height?: number;
  className?: string;
}

const DataManagement: React.FC<DataManagementProps> = ({
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
        {/* Base de données principale */}
        <motion.ellipse
          cx="40"
          cy="20"
          rx="20"
          ry="10"
          fill="#2563EB"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M20 20v30c0 5.523 8.954 10 20 10s20-4.477 20-10V20"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          fill="none"
        />
        
        {/* Anneaux horizontaux */}
        <motion.ellipse
          cx="40"
          cy="35"
          rx="20"
          ry="10"
          stroke="#2563EB"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.ellipse
          cx="40"
          cy="50"
          rx="20"
          ry="10"
          stroke="#2563EB"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        
        {/* Particules de données */}
        <motion.circle
          cx="35"
          cy="18"
          r="2.5"
          fill="#60A5FA"
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1.5
          }}
        />
        <motion.circle
          cx="45"
          cy="22"
          r="3"
          fill="#60A5FA"
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: [0, 5, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1.8
          }}
        />
        
        {/* Lignes de données */}
        <motion.line
          x1="30"
          y1="38"
          x2="50"
          y2="38"
          stroke="#60A5FA"
          strokeWidth="1.5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.line
          x1="25"
          y1="42"
          x2="55"
          y2="42"
          stroke="#60A5FA"
          strokeWidth="1.5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.line
          x1="28"
          y1="46"
          x2="52"
          y2="46"
          stroke="#60A5FA"
          strokeWidth="1.5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          style={{ transformOrigin: 'center' }}
        />
        
        {/* Points de connexion */}
        <motion.circle
          cx="65"
          cy="35"
          r="5"
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
        <motion.circle
          cx="15"
          cy="40"
          r="5"
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
        />
        
        {/* Connexions */}
        <motion.path
          d="M58.5 31.5L65 35"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        />
        <motion.path
          d="M21.5 40L15 40"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.4 }}
        />
      </svg>
    </div>
  );
};

export default DataManagement; 