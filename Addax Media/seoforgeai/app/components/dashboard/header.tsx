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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

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
                <div className="h-6 w-6 rounded-md bg-amber-600"></div>
                <span>SEOForgeAI</span>
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
                    href="/dashboard/projects"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Projets
                  </Link>
                  <Link
                    href="/dashboard/sales"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Ventes
                  </Link>
                  <Link
                    href="/dashboard/clients"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Clients
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
          <div className="h-6 w-6 rounded-md bg-amber-600"></div>
          <span>SEOForgeAI</span>
        </Link>
        <div className="hidden lg:flex lg:gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-medium hover:text-amber-600"
          >
            Tableau de bord
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-1 text-sm font-medium hover:text-amber-600"
          >
            Projets
          </Link>
          <Link
            href="/dashboard/sales"
            className="flex items-center gap-1 text-sm font-medium hover:text-amber-600"
          >
            Ventes
          </Link>
          <Link
            href="/dashboard/clients"
            className="flex items-center gap-1 text-sm font-medium hover:text-amber-600"
          >
            Clients
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
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-amber-600 ring-2 ring-white"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex select-none items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-700" />
              </div>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-sm font-medium">Jean Dupont</span>
                <span className="text-xs text-gray-500">Administrateur</span>
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