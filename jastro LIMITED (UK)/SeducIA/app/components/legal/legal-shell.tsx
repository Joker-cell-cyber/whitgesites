'use client';

import React from 'react';

interface LegalShellProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalShell({ title, lastUpdated, children }: LegalShellProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#45301C] mb-2">{title}</h1>
        <p className="text-sm text-[#64748b]">{lastUpdated}</p>
      </div>
      
      <div className="bg-[#FAF8F4] rounded-xl shadow-lg border border-[#F1EDE8] p-8">
        <div className="prose prose-slate max-w-none">
          {children}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-[#64748b]">
          Pour toute question concernant ces informations légales, veuillez nous contacter à{' '}
          <a href="mailto:support@charmai.ai" className="text-[#E46D4B] hover:text-[#D85A36]">
            support@charmai.ai
          </a>
        </p>
      </div>
    </div>
  );
} 