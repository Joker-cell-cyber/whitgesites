'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "lucide-react";

interface Module {
  id: string;
  name: string;
  status: "En cours" | "Terminé" | "Non commencé";
  progress: number;
  category: string;
  estimatedTime: string;
}

interface LearningActivity {
  id: string;
  activity: string;
  date: string;
  duration: string;
  points: number;
}

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  date: string;
}

const enrolledModules: Module[] = [
  {
    id: "1",
    name: "Techniques d'apprentissage avancées",
    status: "En cours",
    progress: 65,
    category: "Méthodes d'apprentissage",
    estimatedTime: "3 heures",
  },
  {
    id: "2",
    name: "Bases de la mémorisation",
    status: "En attente",
    progress: 0,
    category: "Mémorisation",
    estimatedTime: "2 heures",
  },
  {
    id: "3",
    name: "Lecture rapide - Niveau 1",
    status: "Terminé",
    progress: 100,
    category: "Lecture efficace",
    estimatedTime: "1.5 heures",
  },
];

const recentActivities: LearningActivity[] = [
  {
    id: "1",
    activity: "Quiz sur les techniques de mémorisation",
    date: "Aujourd'hui, 15:30",
    duration: "25 min",
    points: 150,
  },
  {
    id: "2",
    activity: "Vidéo: Comment optimiser votre environnement d'apprentissage",
    date: "Hier, 18:45",
    duration: "42 min",
    points: 85,
  },
  {
    id: "3",
    activity: "Exercice pratique de lecture rapide",
    date: "Il y a 2 jours",
    duration: "15 min",
    points: 120,
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    message: "Nouveau module disponible: Techniques de concentration",
    type: "info",
    date: "Il y a 30 minutes",
  },
  {
    id: "2",
    message: "Félicitations ! Vous avez complété 'Lecture rapide - Niveau 1'",
    type: "success",
    date: "Il y a 2 heures",
  },
  {
    id: "3",
    message: "Rappel: Terminé le quiz avant la fin de la semaine",
    type: "warning",
    date: "Il y a 1 jour",
  },
];

export function Dashboard() {
  const [view, setView] = useState<"overview" | "modules" | "activities">("overview");

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
                value="modules"
                onClick={() => setView("modules")}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Modules</span>
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                onClick={() => setView("activities")}
                className="flex items-center gap-2"
              >
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Activités</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps d'apprentissage</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-rose-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23h 45m</div>
            <p className="text-xs text-gray-500">+2.5h par rapport à la semaine dernière</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score total</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-rose-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3,456</div>
            <p className="text-xs text-gray-500">+432 points cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules complétés</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-rose-600"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-gray-500">+3 depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficacité d'apprentissage</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-rose-600"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <p className="text-xs text-gray-500">+7% par rapport à votre moyenne</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Modules en cours</CardTitle>
            <CardDescription>Progression de vos modules d'apprentissage.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledModules.map((module) => (
                <div key={module.id} className="flex items-center">
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <p className="text-sm font-medium leading-none">{module.name}</p>
                      <div className="flex items-center space-x-1">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            module.status === "En cours"
                              ? "bg-rose-100 text-rose-800"
                              : module.status === "Terminé"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {module.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <div className="text-xs text-gray-500">Catégorie: {module.category}</div>
                      <div className="text-xs text-gray-500">Durée estimée: {module.estimatedTime}</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-rose-500"
                        style={{ width: `${module.progress}%` }}
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
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>Votre parcours d'apprentissage récent.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <p className="text-sm font-medium leading-none">{activity.activity}</p>
                      <div className="text-sm font-medium text-rose-600">+{activity.points} pts</div>
                    </div>
                    <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <div className="text-xs text-gray-500">{activity.date}</div>
                      <div className="text-xs text-gray-500">Durée: {activity.duration}</div>
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