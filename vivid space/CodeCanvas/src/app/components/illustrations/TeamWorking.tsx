import React from 'react';
import { motion } from 'framer-motion';

interface TeamWorkingProps {
  width?: number;
  height?: number;
  className?: string;
}

const TeamWorking: React.FC<TeamWorkingProps> = ({
  width = 600,
  height = 450,
  className = '',
}) => {
  return (
    <div className={`${className}`} style={{ width, height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Arrière-plan */}
        <motion.rect 
          width="600" 
          height="450" 
          fill="#1E1E1E"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Fenêtres et lumière */}
        <motion.rect 
          x="50" 
          y="50" 
          width="100" 
          height="150" 
          rx="5" 
          fill="#6D28D9" 
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.rect 
          x="180" 
          y="50" 
          width="100" 
          height="150" 
          rx="5" 
          fill="#8B5CF6" 
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        
        {/* Table de bureau */}
        <motion.rect 
          x="30" 
          y="280" 
          width="540" 
          height="20" 
          rx="5" 
          fill="#111111"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ transformOrigin: '30px 290px' }}
        />
        <motion.rect 
          x="50" 
          y="300" 
          width="500" 
          height="10" 
          fill="#0A0A0A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        />
        
        {/* Développeur 1 */}
        <g>
          {/* Écran */}
          <motion.rect 
            x="80" 
            y="220" 
            width="120" 
            height="80" 
            rx="3" 
            fill="#111111"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.rect 
            x="85" 
            y="225" 
            width="110" 
            height="65" 
            rx="2" 
            fill="#2D3748"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
          
          {/* Code à l'écran */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <rect x="90" y="230" width="60" height="2" rx="1" fill="#EC4899" />
            <rect x="90" y="235" width="90" height="2" rx="1" fill="#8B5CF6" />
            <rect x="90" y="240" width="40" height="2" rx="1" fill="#ECC94B" />
            <rect x="90" y="245" width="70" height="2" rx="1" fill="#F9FAFB" />
            <rect x="90" y="250" width="65" height="2" rx="1" fill="#8B5CF6" />
            <rect x="90" y="255" width="45" height="2" rx="1" fill="#EC4899" />
            <rect x="90" y="260" width="85" height="2" rx="1" fill="#F9FAFB" />
          </motion.g>
          
          {/* Clavier */}
          <motion.rect 
            x="95" 
            y="310" 
            width="90" 
            height="25" 
            rx="4" 
            fill="#111111"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          
          {/* Développeur (silhouette) */}
          <motion.ellipse 
            cx="140" 
            cy="360" 
            rx="25" 
            ry="30" 
            fill="#6D28D9"
            fillOpacity="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          />
          <motion.circle 
            cx="140" 
            cy="310" 
            r="15" 
            fill="#6D28D9"
            fillOpacity="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </g>
        
        {/* Développeur 2 */}
        <g>
          {/* Écran */}
          <motion.rect 
            x="260" 
            y="220" 
            width="120" 
            height="80" 
            rx="3" 
            fill="#111111"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          />
          <motion.rect 
            x="265" 
            y="225" 
            width="110" 
            height="65" 
            rx="2" 
            fill="#1A202C"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          
          {/* Design à l'écran */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <rect x="270" y="230" width="40" height="30" rx="2" fill="#2D3748" />
            <rect x="315" y="230" width="55" height="30" rx="2" fill="#4A5568" />
            <rect x="270" y="265" width="100" height="20" rx="2" fill="#2D3748" />
          </motion.g>
          
          {/* Clavier */}
          <motion.rect 
            x="275" 
            y="310" 
            width="90" 
            height="25" 
            rx="4" 
            fill="#111111"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          />
          
          {/* Développeur (silhouette) */}
          <motion.ellipse 
            cx="320" 
            cy="360" 
            rx="25" 
            ry="30" 
            fill="#8B5CF6"
            fillOpacity="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          />
          <motion.circle 
            cx="320" 
            cy="310" 
            r="15" 
            fill="#8B5CF6"
            fillOpacity="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          />
        </g>
        
        {/* Développeur 3 */}
        <g>
          {/* Laptop */}
          <motion.path
            d="M430 300L470 265V220H390V265L430 300Z"
            fill="#111111"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.path
            d="M395 225H465V260H395V225Z"
            fill="#1A202C"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          />
          
          {/* Terminal à l'écran */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <rect x="400" y="230" width="60" height="2" rx="1" fill="#A78BFA" />
            <rect x="400" y="235" width="45" height="2" rx="1" fill="#F9FAFB" />
            <rect x="400" y="240" width="55" height="2" rx="1" fill="#F9FAFB" />
            <rect x="400" y="245" width="40" height="2" rx="1" fill="#A78BFA" />
          </motion.g>
          
          {/* Développeur (silhouette) */}
          <motion.ellipse 
            cx="430" 
            cy="360" 
            rx="25" 
            ry="30" 
            fill="#EC4899"
            fillOpacity="0.4" 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          />
          <motion.circle 
            cx="430" 
            cy="310" 
            r="15" 
            fill="#EC4899"
            fillOpacity="0.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          />
        </g>
        
        {/* Éléments décoratifs */}
        <motion.circle
          cx="50"
          cy="350"
          r="5"
          fill="#EC4899"
          fillOpacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.0 }}
        />
        <motion.circle
          cx="550"
          cy="350"
          r="5"
          fill="#8B5CF6"
          fillOpacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 2.1 }}
        />
        
        {/* Effets lumineux */}
        <motion.ellipse
          cx="140"
          cy="260"
          rx="80"
          ry="40"
          fill="url(#purpleGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="430"
          cy="260"
          rx="80"
          ry="40"
          fill="url(#pinkGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Particules flottantes */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + i * 60}
            cy={100 + (i % 3) * 50}
            r="2"
            fill="#A78BFA"
            initial={{ opacity: 0.4, y: 0 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              y: [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + i % 2,
              delay: i * 0.3
            }}
          />
        ))}
        
        {/* Gradients pour les effets de lumière */}
        <defs>
          <radialGradient id="purpleGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="pinkGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TeamWorking; 