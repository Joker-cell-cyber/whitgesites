'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-50">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-repeat pointer-events-none"></div>
      
      {/* Spinner de chargement */}
      <div className="relative w-20 h-20 mb-8">
        {/* Cercles animés */}
        <motion.div 
          className="absolute inset-0 rounded-full border-t-4 border-r-4 border-transparent border-teal-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-3 rounded-full border-b-4 border-l-4 border-transparent border-emerald-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Élément central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-4 h-4 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Effet de lueur */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-teal-600/20 blur-xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Texte animé */}
      <div className="flex flex-col items-center">
        <div className="h-8 overflow-hidden">
          <motion.div
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Chargement
          </motion.div>
        </div>
        
        <div className="flex space-x-1 mt-4">
          {[0, 1, 2].map((dot, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-teal-600"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 