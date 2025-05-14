'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/context/auth-context';
import AuthGuard from '@/app/components/auth/auth-guard';
import { 
  BarChart2, 
  FileText, 
  Coins, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#0a1829]">
        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 bg-[#0a1829] border-t border-[#1E9BF5]/10">
            <div className="hero-glow opacity-50"></div>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
} 