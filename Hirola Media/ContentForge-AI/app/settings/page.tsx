'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SettingsIndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to profile section which will be the main settings page
    router.push('/settings/profile');
  }, [router]);

  return (
    <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="h-8 w-8 text-ocrf-gold-400 animate-spin mb-4" />
      <p className="text-ocrf-brown-200">Redirection vers les paramètres...</p>
    </div>
  );
} 