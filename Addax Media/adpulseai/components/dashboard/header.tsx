'use client';

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

// Composants Sheet temporaires jusqu'à ce que nous ayons le vrai composant
const Sheet = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const SheetTrigger = ({ asChild, children }: { asChild?: boolean, children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const SheetContent = ({ side = "right", className = "", children }: { side?: "left" | "right", className?: string, children: React.ReactNode }) => {
  return (
    <div className={`fixed inset-y-0 ${side === "left" ? "left-0" : "right-0"} z-50 flex w-full max-w-xs flex-col p-6 bg-white shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// Composants dropdown temporaires jusqu'à ce que nous ayons le vrai composant
const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

const DropdownMenuTrigger = ({ asChild, children }: { asChild?: boolean, children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const DropdownMenuContent = ({ align = "left", className = "", children }: { align?: "left" | "right" | "center" | "end", className?: string, children: React.ReactNode }) => {
  return (
    <div className={`absolute right-0 mt-2 w-56 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 ${className}`}>
      {children}
    </div>
  );
};

const DropdownMenuItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100">
      {children}
    </div>
  );
};

const DropdownMenuLabel = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>;
};

const DropdownMenuSeparator = () => {
  return <div className="my-1 h-px bg-gray-200" />;
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 lg:px-8">
      <div className="flex items-center gap-2 lg:gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu principal</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <div className="h-6 w-6 rounded-md bg-orange-600"></div>
                <span>AdPulseAI</span>
              </Link>
              <div className="grid gap-2 pt-4">
                <h4 className="text-sm font-medium">Menu</h4>
                <div className="grid gap-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Tableau de bord
                  </Link>
                  <Link
                    href="/dashboard/courses"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Mes cours
                  </Link>
                  <Link
                    href="/dashboard/certificates"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Certificats
                  </Link>
                  <Link
                    href="/dashboard/earnings"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Revenus
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Paramètres
                  </Link>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="/dashboard"
          className="hidden items-center gap-2 text-lg font-semibold lg:flex"
        >
          <div className="h-6 w-6 rounded-md bg-orange-600"></div>
          <span>AdPulseAI</span>
        </Link>
        <div className="hidden lg:flex lg:gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-medium hover:text-orange-600"
          >
            Tableau de bord
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-1 text-sm font-medium hover:text-orange-600"
          >
            Mes cours
          </Link>
          <Link
            href="/dashboard/certificates"
            className="flex items-center gap-1 text-sm font-medium hover:text-orange-600"
          >
            Certificats
          </Link>
          <Link
            href="/dashboard/earnings"
            className="flex items-center gap-1 text-sm font-medium hover:text-orange-600"
          >
            Revenus
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <form className="hidden lg:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-64 rounded-md pl-8 md:w-80"
            />
          </div>
        </form>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-orange-600 ring-2 ring-white"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex select-none items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-700" />
              </div>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-sm font-medium">Sophie Martin</span>
                <span className="text-xs text-gray-500">Étudiant</span>
              </div>
              <ChevronDown className="h-4 w-4 lg:ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 