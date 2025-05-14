'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from "lucide-react";

interface Course {
  id: string;
  name: string;
  status: "En cours" | "Terminé" | "Non commencé";
  progress: number;
  instructor: string;
  deadline: string;
}

interface Revenue {
  id: string;
  course: string;
  amount: number;
  date: string;
  student: string;
}

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  date: string;
}

const enrolledCourses: Course[] = [
  {
    id: "1",
    name: "Marketing Digital Avancé",
    status: "En cours",
    progress: 65,
    instructor: "Sophie Martin",
    deadline: "15 août 2023",
  },
  {
    id: "2",
    name: "Analytics et Mesure de Performance",
    status: "Non commencé",
    progress: 0,
    instructor: "Thomas Dubois",
    deadline: "10 septembre 2023",
  },
  {
    id: "3",
    name: "Fondamentaux du SEO",
    status: "Terminé",
    progress: 100,
    instructor: "Emma Blanc",
    deadline: "1 juin 2023",
  },
];

const recentRevenues: Revenue[] = [
  {
    id: "1",
    course: "Formation Complète en Publicité Facebook",
    amount: 299,
    date: "10 juin 2023",
    student: "Alexandre Petit",
  },
  {
    id: "2",
    course: "Email Marketing Masterclass",
    amount: 199,
    date: "8 juin 2023",
    student: "Marie Lambert",
  },
  {
    id: "3",
    course: "Pack Marketing Digital",
    amount: 499,
    date: "2 juin 2023",
    student: "Paul Bernard",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    message: "Nouveau commentaire dans le forum du cours SEO",
    type: "info",
    date: "Il y a 30 minutes",
  },
  {
    id: "2",
    message: "Félicitations ! Votre certificat 'Fondamentaux du SEO' est disponible",
    type: "success",
    date: "Il y a 2 heures",
  },
  {
    id: "3",
    message: "La date limite pour le projet Marketing Digital approche",
    type: "warning",
    date: "Il y a 1 jour",
  },
];

export function Dashboard() {
  const [view, setView] = useState<"overview" | "courses" | "revenues">("overview");

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
                value="courses"
                onClick={() => setView("courses")}
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Cours</span>
              </TabsTrigger>
              <TabsTrigger
                value="revenues"
                onClick={() => setView("revenues")}
                className="flex items-center gap-2"
              >
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Revenus</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-orange-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">€38,592.20</div>
            <p className="text-xs text-gray-500">+15.8% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Étudiants</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-orange-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+82</div>
            <p className="text-xs text-gray-500">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours Actifs</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-orange-600"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <p className="text-xs text-gray-500">+3 nouveaux cette semaine</p>
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
              className="h-4 w-4 text-orange-600"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-gray-500">+2% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cours Inscrits</CardTitle>
            <CardDescription>Vue d'ensemble de vos cours en cours.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="flex items-center">
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <p className="text-sm font-medium leading-none">{course.name}</p>
                      <div className="flex items-center space-x-1">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            course.status === "En cours"
                              ? "bg-orange-100 text-orange-800"
                              : course.status === "Terminé"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <div className="text-xs text-gray-500">Instructeur: {course.instructor}</div>
                      <div className="text-xs text-gray-500">Date limite: {course.deadline}</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-orange-500"
                        style={{ width: `${course.progress}%` }}
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
            <CardTitle>Revenus Récents</CardTitle>
            <CardDescription>Vue d'ensemble de vos dernières ventes de formations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRevenues.map((revenue) => (
                <div key={revenue.id} className="flex items-center">
                  <div className="w-full space-y-1">
                    <div className="flex items-center justify-between space-x-2">
                      <p className="text-sm font-medium leading-none">{revenue.course}</p>
                      <div className="text-sm font-medium">{revenue.amount} €</div>
                    </div>
                    <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <div className="text-xs text-gray-500">Étudiant: {revenue.student}</div>
                      <div className="text-xs text-gray-500">Date: {revenue.date}</div>
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
                        : "bg-orange-500"
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