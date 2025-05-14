import React from 'react';
import { motion } from 'framer-motion';

interface TrainingEducationProps {
  width?: number;
  height?: number;
  className?: string;
}

const TrainingEducation: React.FC<TrainingEducationProps> = ({
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
        {/* Toque d'étudiant / chapeau de diplôme */}
        <motion.path
          d="M15 35L40 25L65 35L40 45L15 35Z"
          fill="#10B981"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.path
          d="M40 45V60"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Livres empilés */}
        <motion.rect
          x="25"
          y="50"
          width="30"
          height="5"
          fill="#059669"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{ transformOrigin: '25px 52.5px' }}
        />
        <motion.rect
          x="23"
          y="55"
          width="34"
          height="5"
          fill="#34D399"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          style={{ transformOrigin: '23px 57.5px' }}
        />
        <motion.rect
          x="27"
          y="60"
          width="26"
          height="5"
          fill="#6EE7B7"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          style={{ transformOrigin: '27px 62.5px' }}
        />
        
        {/* Gland du chapeau */}
        <motion.path
          d="M40 45V53C40 53 47 53 47 45"
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        />
        
        {/* Ampoule (idée) */}
        <motion.circle
          cx="40"
          cy="15"
          r="8"
          fill="#A7F3D0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            delay: 1.8
          }}
        />
        
        <motion.path
          d="M35 15L45 15M40 10L40 20"
          stroke="#059669"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
        
        {/* Connexions neuronales */}
        <motion.path
          d="M40 23L40 25"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 2.1 }}
        />
        
        <motion.path
          d="M30 17.5L25 25"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 2.2 }}
        />
        
        <motion.path
          d="M50 17.5L55 25"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 2.3 }}
        />
        
        {/* Étoiles / étincelles d'apprentissage */}
        <motion.path
          d="M20 25L22 22M20 22L22 25"
          stroke="#A7F3D0"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ scale: 0 }}
          animate={{ scale: 1, opacity: [1, 0] }}
          transition={{ 
            scale: { duration: 0.3, delay: 2.4 },
            opacity: { duration: 1, delay: 2.6, repeat: Infinity, repeatDelay: 3 }
          }}
        />
        
        <motion.path
          d="M60 25L62 22M60 22L62 25"
          stroke="#A7F3D0"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ scale: 0 }}
          animate={{ scale: 1, opacity: [1, 0] }}
          transition={{ 
            scale: { duration: 0.3, delay: 2.5 },
            opacity: { duration: 1, delay: 2.7, repeat: Infinity, repeatDelay: 3 }
          }}
        />
        
        <motion.path
          d="M15 38L17 35M15 35L17 38"
          stroke="#A7F3D0"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ scale: 0 }}
          animate={{ scale: 1, opacity: [1, 0] }}
          transition={{ 
            scale: { duration: 0.3, delay: 2.6 },
            opacity: { duration: 1, delay: 2.8, repeat: Infinity, repeatDelay: 3 }
          }}
        />
      </svg>
    </div>
  );
};

export default TrainingEducation; 