'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar navigation */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-white mb-4">Paramètres</h2>
                <nav className="space-y-1">
                  <NavItem 
                    href="/settings/profile" 
                    active={pathname === '/settings/profile'}
                  >
                    Profil
                  </NavItem>
                  <NavItem 
                    href="/settings/account" 
                    active={pathname === '/settings/account'}
                  >
                    Compte
                  </NavItem>
                  <NavItem 
                    href="/settings/subscription" 
                    active={pathname === '/settings/subscription'}
                  >
                    Abonnement
                  </NavItem>
                  <NavItem 
                    href="/settings/notifications" 
                    active={pathname === '/settings/notifications'}
                  >
                    Notifications
                  </NavItem>
                  <NavItem 
                    href="/unsubscribe" 
                    active={false}
                    danger
                  >
                    Désabonnement
                  </NavItem>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation item component
function NavItem({ 
  href, 
  active, 
  danger = false, 
  children 
}: { 
  href: string; 
  active: boolean; 
  danger?: boolean;
  children: ReactNode 
}) {
  return (
    <Link 
      href={href}
      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-gradient-to-r from-ocrf-copper-500/20 to-ocrf-gold-500/20 text-ocrf-gold-300'
          : danger
            ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
            : 'text-ocrf-brown-200 hover:bg-ocrf-gold-500/10 hover:text-ocrf-gold-300'
      }`}
    >
      {children}
    </Link>
  );
} 