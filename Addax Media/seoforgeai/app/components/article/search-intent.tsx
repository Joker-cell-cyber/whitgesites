'use client';

import { useState } from 'react';

interface SearchIntentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchIntent({ value, onChange }: SearchIntentProps) {
  // Options d'intention de recherche
  const options = [
    {
      id: 'informational',
      title: 'Informationnel',
      description: 'Fournir des informations et répondre aux questions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'commercial',
      title: 'Commercial',
      description: 'Promouvoir un produit ou service',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'navigational',
      title: 'Navigationnel',
      description: 'Guider vers une ressource ou destination',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'transactional',
      title: 'Transactionnel',
      description: 'Faciliter une action ou transaction',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={`flex flex-col items-start p-4 border rounded-lg transition-colors h-full ${
            value === option.id
              ? 'bg-teal-50 border-teal-300 shadow-sm'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 w-full">
            <span className="flex-shrink-0">{option.icon}</span>
            <span className={`font-medium truncate ${
              value === option.id ? 'text-teal-700' : 'text-slate-700'
            }`}>
              {option.title}
            </span>
          </div>
          <span className="text-sm text-slate-500 w-full">
            {option.description}
          </span>
        </button>
      ))}
    </div>
  );
} 