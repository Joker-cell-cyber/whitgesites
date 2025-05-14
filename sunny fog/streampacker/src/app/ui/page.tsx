import React from 'react';
import TooltipDemo from '@/components/ui/TooltipDemo';

export default function UIComponentsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
            Cyberpunk UI Components
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A collection of cyberpunk-themed UI components that bring a futuristic touch to your streaming platform.
            Hover over the elements below to see the tooltips in action.
          </p>
        </header>

        <main>
          <TooltipDemo />
        </main>

        <footer className="mt-16 text-center text-zinc-500 text-sm">
          <p>Cyberpunk UI Component Library</p>
          <p className="mt-1">Part of StreamPacker&apos;s exclusive design system</p>
        </footer>
      </div>
    </div>
  );
} 