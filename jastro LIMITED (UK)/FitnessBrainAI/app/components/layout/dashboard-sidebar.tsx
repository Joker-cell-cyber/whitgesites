"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAVIGATION, SITE_NAME } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

// Importation dynamique des icônes de Lucide React
import * as LucideIcons from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full border-r bg-background">
      <div className="p-6 border-b">
        <Link href="/coach" className="flex items-center gap-2">
          <span className="text-xl font-bold">{SITE_NAME}</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-1">
          {DASHBOARD_NAVIGATION.map((item) => {
            // Récupérer dynamiquement l'icône
            const Icon = (LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ComponentType<{ className?: string }>;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <LucideIcons.User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Utilisateur</p>
            <p className="text-xs text-muted-foreground">utilisateur@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 