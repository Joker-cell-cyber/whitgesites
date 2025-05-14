'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { CheckCircle, AlertCircle, Copy, Download, Undo2, BarChart3, Clock } from 'lucide-react';
import ExportArticle from './export-article';

interface ArticlePreviewProps {
  generatedContent: string | null;
  htmlContent: string | null;
  textContent: string | null;
  generationStats: {
    wordCount: number;
    readingTime: number;
    tokensUsed: number;
    requestedWordCount?: number;
    wordCountPercentage?: number;
    seoScore?: number;
  } | null;
  generationTime: number | null;
  wordCountInfo: string | null;
  wordCountStatus: 'success' | 'warning' | 'error' | null;
  articleStructure: { level: number; title: string }[] | null;
  seoAnalysis: {
    keywordDensity: number;
    readabilityScore: number;
    suggestions: string[];
  } | null;
  onRegenerate: (formData: any) => Promise<void>;
  onReset: () => void;
  isGenerating: boolean;
}

export default function ArticlePreview({
  generatedContent,
  htmlContent,
  textContent,
  generationStats,
  generationTime,
  wordCountInfo,
  wordCountStatus,
  articleStructure,
  seoAnalysis,
  onRegenerate,
  onReset,
  isGenerating
}: ArticlePreviewProps) {
  const [selectedTab, setSelectedTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [showSeoAnalysis, setShowSeoAnalysis] = useState(false);

  // Gérer la copie du contenu
  const handleCopy = async () => {
    if (generatedContent) {
      try {
        await navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erreur lors de la copie du texte:', err);
      }
    }
  };

  // Télécharger l'article au format Markdown
  const handleDownload = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'article.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Fonction pour formater le contenu Markdown
  const formatMarkdown = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-slate-800">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3 mt-5 text-slate-800">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2 mt-4 text-slate-800">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" class="my-4 rounded-md" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-teal-600 hover:underline">$1</a>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-teal-300 pl-4 py-2 my-4 bg-teal-50 text-slate-700 rounded-r-md">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc text-slate-700 mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal text-slate-700 mb-1">$1</li>')
      .replace(/<\/li>\n<li/g, '</li>\n<li')
      .replace(/^```(.*)\n([\s\S]*?)\n```$/gm, '<pre class="bg-slate-800 text-slate-200 rounded-md p-4 my-4 overflow-x-auto"><code>$2</code></pre>')
      .replace(/^---/gm, '<hr class="my-4 border-t border-slate-200" />')
      .replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 leading-relaxed">')
      .replace(/^([^<].*)/gm, '$1')
      .replace(/^\s*$/gm, '');
  };

  return (
    <div className="space-y-6">
      {/* Tabs de navigation */}
      <div className="flex border-b border-slate-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            selectedTab === 'preview'
              ? 'text-teal-600 border-b-2 border-teal-500'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setSelectedTab('preview')}
        >
          Aperçu
              </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            selectedTab === 'markdown'
              ? 'text-teal-600 border-b-2 border-teal-500'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setSelectedTab('markdown')}
        >
          Markdown
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            selectedTab === 'html'
              ? 'text-teal-600 border-b-2 border-teal-500'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setSelectedTab('html')}
        >
          HTML
        </button>
      </div>
      
      {/* Affichage du contenu selon l'onglet sélectionné */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {selectedTab === 'preview' && generatedContent && (
          <div className="p-6 overflow-auto max-h-[60vh]">
            <div 
              className="prose prose-slate max-w-none" 
              dangerouslySetInnerHTML={{ 
                __html: `<p class="mb-4 text-slate-700 leading-relaxed">${formatMarkdown(generatedContent)}</p>` 
              }} 
            />
          </div>
        )}

        {selectedTab === 'markdown' && generatedContent && (
          <div className="relative">
            <pre className="p-6 overflow-auto max-h-[60vh] font-mono text-sm bg-slate-50 text-slate-800 whitespace-pre-wrap">
              {generatedContent}
            </pre>
            
            <div className="absolute top-2 right-2">
              <button 
                onClick={handleCopy}
                className="p-2 bg-white rounded-md border border-slate-200 hover:bg-slate-100 transition-colors"
                title="Copier le contenu"
              >
                {copied ? <CheckCircle className="h-4 w-4 text-teal-600" /> : <Copy className="h-4 w-4 text-slate-600" />}
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'html' && htmlContent && (
          <div className="relative">
            <pre className="p-6 overflow-auto max-h-[60vh] font-mono text-sm bg-slate-50 text-slate-800 whitespace-pre-wrap">
              {htmlContent}
            </pre>
          </div>
        )}
      </div>

      {/* Contrôles et statistiques supplémentaires */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Structure de l'article */}
        <div className="flex-1">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 mb-2 hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-800">Structure de l'article</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-slate-400 transition-transform ${showStructure ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showStructure && articleStructure && (
            <div className="bg-white border border-slate-200 rounded-lg p-4 max-h-60 overflow-y-auto">
              <ul className="space-y-1">
                {articleStructure.map((item, index) => (
                  <li 
                    key={index} 
                    className="text-sm" 
                    style={{ 
                      paddingLeft: `${(item.level - 1) * 1}rem`,
                      color: item.level === 1 ? '#0f766e' : item.level === 2 ? '#0f766e' : '#64748b'
                    }}
                  >
                    {item.level === 1 ? '📌 ' : item.level === 2 ? '📎 ' : '• '}
                    <span className={`${item.level === 1 ? 'font-medium' : ''}`}>{item.title}</span>
                  </li>
                ))}
              </ul>
        </div>
      )}
      
          {/* Analyse SEO */}
          {seoAnalysis && (
            <>
              <button
                onClick={() => setShowSeoAnalysis(!showSeoAnalysis)}
                className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 mt-4 mb-2 hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-slate-800">Analyse SEO</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-slate-400 transition-transform ${showSeoAnalysis ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSeoAnalysis && (
                <div className="bg-white border border-slate-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-600">Densité de mots-clés</span>
                      <span className="text-sm font-medium text-slate-700">{seoAnalysis.keywordDensity.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          seoAnalysis.keywordDensity < 1 ? 'bg-amber-500' :
                          seoAnalysis.keywordDensity > 3 ? 'bg-amber-500' :
                          'bg-teal-500'
                        }`}
                        style={{ width: `${Math.min(100, seoAnalysis.keywordDensity * 33)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {seoAnalysis.keywordDensity < 1 ? 'Densité faible' :
                       seoAnalysis.keywordDensity > 3 ? 'Densité élevée' :
                       'Densité optimale'}
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-600">Lisibilité</span>
                      <span className="text-sm font-medium text-slate-700">{seoAnalysis.readabilityScore.toFixed(0)}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          seoAnalysis.readabilityScore < 60 ? 'bg-amber-500' :
                          seoAnalysis.readabilityScore > 90 ? 'bg-teal-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, seoAnalysis.readabilityScore)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {seoAnalysis.suggestions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Suggestions d'amélioration</h4>
                      <ul className="space-y-1">
                        {seoAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-xs text-slate-600 flex items-start">
                            <span className="inline-block w-4 h-4 text-amber-500 mr-2">•</span>
                            {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="lg:w-64 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Actions</h3>
            
            <div className="space-y-2">
              <Button
                onClick={handleCopy}
                disabled={!generatedContent}
                className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                variant="outline"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copié !' : 'Copier le texte'}
              </Button>
              
              <Button
                onClick={handleDownload}
                disabled={!generatedContent}
                className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              
              <Button
                onClick={onReset}
                disabled={isGenerating}
                className="w-full bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 flex items-center justify-center"
                variant="outline"
              >
                <Undo2 className="h-4 w-4 mr-2" />
                Nouveau article
              </Button>
            </div>
            
            {/* Statistiques de génération */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-medium text-slate-700 mb-3">Statistiques</h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-1.5 text-slate-400" />
                    Mots
                  </span>
                  <span className="font-medium text-slate-700">
                    {generationStats?.wordCount || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                    Temps de lecture
                  </span>
                  <span className="font-medium text-slate-700">
                    {generationStats?.readingTime || 0} min
                  </span>
                </div>
                
                {generationTime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Génération
                    </span>
                    <span className="font-medium text-slate-700">
                      {generationTime.toFixed(1)} sec
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 