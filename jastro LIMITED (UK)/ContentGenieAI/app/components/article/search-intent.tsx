'use client';

import { useState } from 'react';

interface SearchIntentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchIntent({ value, onChange }: SearchIntentProps) {
  const intents = [
    {
      id: 'informational',
      title: 'Informationnel',
      description: 'Fournir des informations et répondre aux questions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'commercial',
      title: 'Commercial',
      description: 'Promouvoir un produit ou service',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'navigational',
      title: 'Navigationnel',
      description: 'Guider vers une ressource ou destination',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      id: 'transactional',
      title: 'Transactionnel',
      description: 'Faciliter une action ou transaction',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Intention de recherche
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {intents.map((intent) => (
          <div
            key={intent.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all min-h-[100px] flex flex-col ${
              value === intent.id
                ? 'bg-purple-500/20 border-purple-500/50'
                : 'bg-black/20 border-gray-700 hover:bg-gray-800/50'
            }`}
            onClick={() => onChange(intent.id)}
          >
            <div className="flex items-center mb-2">
              <div className={`mr-2 ${value === intent.id ? 'text-purple-400' : 'text-gray-400'}`}>
                {intent.icon}
              </div>
              <h3 className={`font-medium ${value === intent.id ? 'text-white' : 'text-gray-300'}`}>
                {intent.title}
              </h3>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">{intent.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 