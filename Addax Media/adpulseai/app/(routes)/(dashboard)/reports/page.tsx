'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { TOKEN_COST_REPORT } from '@/app/lib/constants';
import { FileText, Zap, Download, Share2, ArrowLeft, BarChart3, Calendar, Clock, Filter, FileBarChart } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  const { user } = useAuth();
  const { stats, refreshStats } = useStats();
  
  // État pour les rapports (dans une implémentation réelle, cela serait chargé depuis l'API)
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div className="container mx-auto px-4 pb-10">
      {/* En-tête avec animation subtile */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-800 to-indigo-700 p-8 mb-8">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">Rapports d'analyse</h1>
            <p className="text-indigo-100 max-w-lg">
              Générez et téléchargez des rapports détaillés pour améliorer vos campagnes publicitaires.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="mr-3">
              <Zap className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-100">Votre solde</p>
              <p className="text-xl font-bold text-white">{stats?.tokenBalance || 0} tokens</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Message de développement avec un design amélioré */}
      <Card className="overflow-hidden border border-indigo-800/30 bg-gradient-to-br from-indigo-900/20 to-gray-900 shadow-md mb-8">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-indigo-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Fonctionnalité en développement</h2>
          </div>
          
          <p className="mb-4 text-gray-300">
            La gestion des rapports est en cours de développement. Cette page vous permettra de:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/20">
              <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                <FileBarChart className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Rapports détaillés</h3>
                <p className="text-sm text-gray-300">Générez des rapports riches en informations à partir de vos analyses précédentes</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/20">
              <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                <Download className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Exports flexibles</h3>
                <p className="text-sm text-gray-300">Téléchargez vos rapports dans différents formats (PDF, CSV, JSON)</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/20">
              <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                <Filter className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Personnalisation</h3>
                <p className="text-sm text-gray-300">Adaptez le contenu et la présentation des rapports selon vos besoins</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/20">
              <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                <Share2 className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Partage d'équipe</h3>
                <p className="text-sm text-gray-300">Partagez facilement vos insights avec votre équipe marketing</p>
              </div>
            </div>
          </div>
          
          <Link href="/data-analysis">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analyser des données
            </Button>
          </Link>
        </div>
      </Card>
      
      {/* Liste des rapports avec design amélioré */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Vos rapports</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent ml-4"></div>
        </div>
        
        {reports.length === 0 ? (
          <Card className="overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950">
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-full mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <p className="text-center py-2 text-gray-300 mb-4">
                Vous n'avez pas encore généré de rapports.
              </p>
              <Link href="/data-analysis">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analyser des données pour créer un rapport
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map(report => (
              <Card key={report.id} className="overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{report.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {report.type}
                    </span>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {report.duration}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-6">
                    {report.description || "Rapport d'analyse détaillé de vos performances publicitaires."}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {report.pageCount} pages · {report.fileSize}
                    </span>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                      <Download className="h-3 w-3" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Section pour créer de nouveaux rapports */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Générer un nouveau rapport</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent ml-4"></div>
        </div>
        
        <div className="p-6 border-2 border-dashed border-gray-700 rounded-lg hover:border-indigo-500/50 transition-colors">
          <div className="text-center max-w-md mx-auto">
            <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-full inline-flex mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Créez votre rapport personnalisé</h3>
            <p className="text-gray-300 mb-6">
              Générez des rapports détaillés à partir de vos analyses pour partager avec votre équipe ou vos clients.
              Un rapport coûte {TOKEN_COST_REPORT} tokens.
            </p>
            <Link href="/data-analysis">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                Commencer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 