"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Feature = {
  name: string;
  description?: string;
  includedIn: string[]; // List of package IDs that include this feature
};

type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
  type: 'Cash Game' | 'Tournament' | 'Spin & Go';
  popular?: boolean;
};

type PackageSelectorProps = {
  packages: Package[];
  features: Feature[];
  className?: string;
};

export default function PackageSelector({
  packages,
  features,
  className = '',
}: PackageSelectorProps) {
  const [selectedType, setSelectedType] = useState<string>('Cash Game');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Filter packages by type
  const filteredPackages = packages.filter(pkg => pkg.type === selectedType);
  
  // Group packages by type for the tabs
  const packageTypes = [...new Set(packages.map(pkg => pkg.type))];
  
  return (
    <div className={`bg-felt-900/60 backdrop-blur-sm rounded-xl border border-felt-800/50 ${className}`}>
      {/* Package type tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-felt-800/50">
        {packageTypes.map(type => (
          <button
            key={type}
            className={`px-5 py-4 text-sm font-medium whitespace-nowrap ${
              selectedType === type 
                ? 'text-chip-gold-500 border-b-2 border-chip-gold-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => {
              setSelectedType(type);
              setSelectedPackage(null);
            }}
          >
            {type} Packages
          </button>
        ))}
      </div>
      
      {/* Packages grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPackages.map(pkg => (
            <motion.div
              key={pkg.id}
              className={`relative rounded-lg border ${
                selectedPackage === pkg.id 
                  ? 'border-chip-gold-500' 
                  : 'border-felt-800/50 hover:border-felt-700/50'
              } p-5 cursor-pointer transition-all duration-200`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => setSelectedPackage(pkg.id === selectedPackage ? null : pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-5 bg-chip-gold-500 text-felt-900 text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <h3 className="text-lg font-bold font-montserrat mb-2">{pkg.name}</h3>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-white font-roboto-mono">€{pkg.price.toFixed(2)}</span>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
              
              <button 
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  selectedPackage === pkg.id
                    ? 'bg-chip-gold-500 text-felt-900 hover:bg-chip-gold-600'
                    : 'bg-felt-800 text-white hover:bg-felt-700'
                }`}
              >
                {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Feature comparison */}
        <AnimatePresence>
          {selectedPackage && (
            <motion.div 
              className="mt-8 border-t border-felt-800/50 pt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold font-montserrat mb-4">Package Features</h3>
              
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const isIncluded = feature.includedIn.includes(selectedPackage);
                  
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        isIncluded ? 'bg-chip-gold-500 text-felt-900' : 'bg-gray-800 text-gray-600'
                      }`}>
                        {isIncluded ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      
                      <div>
                        <p className={`font-medium ${isIncluded ? 'text-white' : 'text-gray-500'}`}>
                          {feature.name}
                        </p>
                        {feature.description && (
                          <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-center">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-gradient-to-r from-felt-700 to-felt-900 hover:from-felt-600 hover:to-felt-800 text-white rounded-lg font-medium button-glow transition-colors text-center"
                >
                  Book Your Coaching Session
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 