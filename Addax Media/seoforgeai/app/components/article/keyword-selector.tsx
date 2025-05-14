'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface KeywordSelectorProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
  maxKeywords?: number;
}

export default function KeywordSelector({
  keywords = [],
  onChange,
  maxKeywords = 5
}: KeywordSelectorProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [error, setError] = useState('');

  const handleAddKeyword = () => {
    const trimmedKeyword = newKeyword.trim();
    
    if (!trimmedKeyword) {
      setError('Veuillez entrer un mot-clé');
      return;
    }
    
    if (keywords.includes(trimmedKeyword)) {
      setError('Ce mot-clé existe déjà');
      return;
    }
    
    if (keywords.length >= maxKeywords) {
      setError(`Vous ne pouvez pas ajouter plus de ${maxKeywords} mots-clés`);
      return;
    }
    
    onChange([...keywords, trimmedKeyword]);
    setNewKeyword('');
    setError('');
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    onChange(keywords.filter(k => k !== keywordToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {keywords.map((keyword) => (
          <div 
            key={keyword}
            className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-sm text-teal-700"
          >
            <span>{keyword}</span>
            <button 
              type="button"
              onClick={() => handleRemoveKeyword(keyword)}
              className="ml-1.5 text-teal-600 hover:text-teal-800 focus:outline-none"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {keywords.length === 0 && (
          <div className="text-sm text-slate-500 italic">
            Aucun mot-clé sélectionné
          </div>
        )}
      </div>
      
      {keywords.length < maxKeywords && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => {
                setNewKeyword(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ajouter un mot-clé"
              className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddKeyword}
            className="inline-flex items-center justify-center h-10 px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            <span>Ajouter</span>
          </button>
        </div>
      )}
    </div>
  );
} 