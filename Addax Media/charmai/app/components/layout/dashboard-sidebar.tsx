"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAVIGATION, SITE_NAME } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

// Importation dynamique des icônes de Lucide React
import * as LucideIcons from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full border-r border-pink-100 bg-white/90 backdrop-blur-md">
      <div className="p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-pink-100/50">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">{SITE_NAME}</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-2">
          {APP_NAVIGATION.map((item) => {
            // Récupérer dynamiquement l'icône
            const Icon = (LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all",
                  pathname === item.href || pathname.startsWith(item.href)
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-pink-100 bg-gradient-to-r from-pink-50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center text-white">
            <LucideIcons.User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Utilisateur</p>
            <p className="text-xs text-gray-500">utilisateur@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 