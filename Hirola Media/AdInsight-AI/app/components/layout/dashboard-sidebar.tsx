"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Search, 
  Users,
  Settings,
  PieChart,
  FileText,
  MessageSquare,
  CreditCard,
  Zap,
  Megaphone,
  BookOpen
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  
  const mainNavItems = [
    { name: "Tableau de bord", href: "/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Analyses", href: "/dashboard/analysis", icon: <Search className="w-5 h-5" /> },
    { name: "Rapports", href: "/dashboard/reports", icon: <FileText className="w-5 h-5" /> },
    { name: "Statistiques", href: "/dashboard/stats", icon: <PieChart className="w-5 h-5" /> },
    { name: "Campagnes", href: "/dashboard/campaigns", icon: <Megaphone className="w-5 h-5" /> }
  ];
  
  const secondaryNavItems = [
    { name: "Formations", href: "/dashboard/courses", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Support", href: "/dashboard/support", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Équipe", href: "/dashboard/team", icon: <Users className="w-5 h-5" /> },
    { name: "Acheter des tokens", href: "/tokens/buy", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Paramètres", href: "/settings", icon: <Settings className="w-5 h-5" /> }
  ];
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-adfi-slate-200 z-30 hidden lg:block">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 border-b border-adfi-slate-200 flex items-center px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-adfi-blue-600 to-adfi-blue-500 flex items-center justify-center shadow-lg shadow-adfi-blue-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-adfi-slate-900">
              AdInsight<span className="text-adfi-blue-600">AI</span>
            </span>
          </Link>
        </div>
        
        {/* Navigation principale */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-adfi-blue-50 text-adfi-blue-700"
                    : "text-adfi-slate-700 hover:bg-adfi-slate-100 hover:text-adfi-slate-900"
                }`}
              >
                <span className={`mr-3 ${isActive(item.href) ? "text-adfi-blue-600" : "text-adfi-slate-500"}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Séparateur */}
          <div className="my-6 px-3">
            <div className="h-px bg-adfi-slate-200"></div>
          </div>
          
          {/* Navigation secondaire */}
          <div className="space-y-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-adfi-blue-50 text-adfi-blue-700"
                    : "text-adfi-slate-700 hover:bg-adfi-slate-100 hover:text-adfi-slate-900"
                }`}
              >
                <span className={`mr-3 ${isActive(item.href) ? "text-adfi-blue-600" : "text-adfi-slate-500"}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Promo */}
        <div className="p-4 border-t border-adfi-slate-200">
          <div className="p-4 bg-gradient-to-br from-adfi-blue-500 to-adfi-blue-600 rounded-xl text-white">
            <h3 className="font-semibold mb-1">Plan Premium</h3>
            <p className="text-xs text-blue-100 mb-3">Débloquez toutes les fonctionnalités</p>
            <Link 
              href="/pricing" 
              className="block text-center py-1.5 px-4 bg-white text-adfi-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Mettre à niveau
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
} 