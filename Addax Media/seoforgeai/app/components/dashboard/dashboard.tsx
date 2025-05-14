'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: "En cours" | "Terminé" | "En attente";
  progress: number;
  client: string;
  deadline: string;
}

interface Sale {
  id: string;
  product: string;
  amount: number;
  date: string;
  client: string;
}

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  date: string;
}

const recentProjects: Project[] = [
  {
    id: "1",
    name: "Sculpture sur mesure - Jardin d'Eden",
    status: "En cours",
    progress: 65,
    client: "Marie Dupont",
    deadline: "15 juillet 2023",
  },
  {
    id: "2",
    name: "Fresque murale - Hôtel Bellevue",
    status: "En attente",
    progress: 30,
    client: "Groupe Hotelier Luxe",
    deadline: "22 août 2023",
  },
  {
    id: "3",
    name: "Lampes artisanales - Collection Automne",
    status: "Terminé",
    progress: 100,
    client: "Boutique Lumière Douce",
    deadline: "5 juin 2023",
  },
];

const recentSales: Sale[] = [
  {
    id: "1",
    product: "Tableau 'Aurore Boréale'",
    amount: 1250,
    date: "10 juin 2023",
    client: "Galerie d'Art Moderne",
  },
  {
    id: "2",
    product: "Ensemble de vases 'Ondulation'",
    amount: 780,
    date: "8 juin 2023",
    client: "Jean Martin",
  },
  {
    id: "3",
    product: "Sculpture 'Équilibre'",
    amount: 2400,
    date: "2 juin 2023",
    client: "Bureau d'Architecture Novel",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    message: "Nouveau message de Marie Dupont concernant sa commande",
    type: "info",
    date: "Il y a 30 minutes",
  },
  {
    id: "2",
    message: "Commande #8742 terminée et prête pour livraison",
    type: "success",
    date: "Il y a 2 heures",
  },
  {
    id: "3",
    message: "Stock faible pour le bois de chêne - à renouveler",
    type: "warning",
    date: "Il y a 1 jour",
  },
];

export function Dashboard() {
  const [view, setView] = useState<"overview" | "projects" | "sales">("overview");

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tableau de bord</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="overview" className="w-fit">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="overview"
                onClick={() => setView("overview")}
                className="flex items-center gap-2"
              >
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Aperçu</span>
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                onClick={() => setView("projects")}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Projets</span>
              </TabsTrigger>
              <TabsTrigger
                value="sales"
                onClick={() => setView("sales")}
                className="flex items-center gap-2"
              >
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Ventes</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-amber-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€45,231.89</div>
            <p className="text-xs text-gray-500">+20.1% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-amber-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+12</div>
            <p className="text-xs text-gray-500">+4% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets en Cours</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-amber-600"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-500">+2 nouveaux cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Complétion</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-amber-600"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">93%</div>
            <p className="text-xs text-gray-500">+5% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Projets Récents</CardTitle>
            <CardDescription>Vue d'ensemble de vos projets en cours.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center">
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <p className="text-sm font-medium leading-none">{project.name}</p>
                      <div className="flex items-center space-x-1">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            project.status === "En cours"
                              ? "bg-amber-100 text-amber-800"
                              : project.status === "Terminé"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <div className="text-xs text-gray-500">Client: {project.client}</div>
                      <div className="text-xs text-gray-500">Échéance: {project.deadline}</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ventes Récentes</CardTitle>
            <CardDescription>Vue d'ensemble de vos dernières ventes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center">
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <p className="text-sm font-medium leading-none">{sale.product}</p>
                      <div className="text-sm font-medium">{sale.amount} €</div>
                    </div>
                    <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <div className="text-xs text-gray-500">Client: {sale.client}</div>
                      <div className="text-xs text-gray-500">Date: {sale.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4 md:col-span-8">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Vos dernières notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-4">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      notification.type === "info"
                        ? "bg-blue-500"
                        : notification.type === "success"
                        ? "bg-green-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 