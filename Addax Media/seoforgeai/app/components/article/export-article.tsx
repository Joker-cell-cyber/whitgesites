'use client';

import { useState } from 'react';
import { Download, Copy, FileText, FileCode, FileJson } from 'lucide-react';

interface ExportArticleProps {
  markdownContent: string;
  htmlContent: string;
  textContent: string;
  title: string;
}

export default function ExportArticle({
  markdownContent,
  htmlContent,
  textContent,
  title
}: ExportArticleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<'markdown' | 'html' | 'text' | null>(null);

  // Fonction pour copier le contenu
  const copyContent = async (content: string, type: 'markdown' | 'html' | 'text') => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie du contenu:', err);
    }
  };

  // Fonction pour télécharger le contenu
  const downloadContent = (content: string, type: 'markdown' | 'html' | 'text') => {
    const sanitizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    const formats = {
      markdown: { extension: 'md', mimeType: 'text/markdown' },
      html: { extension: 'html', mimeType: 'text/html' },
      text: { extension: 'txt', mimeType: 'text/plain' }
    };
    
    const { extension, mimeType } = formats[type];
    const fileName = `${sanitizedTitle || 'article'}.${extension}`;
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
      >
        <Download className="h-4 w-4" />
        <span className="text-sm font-medium">Exporter</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
          <div className="p-2 border-b border-slate-100">
            <h3 className="text-sm font-medium text-slate-800">Exporter l'article</h3>
          </div>
          
          <div className="p-2">
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-teal-600 mr-2" />
                  <span className="text-sm text-slate-700">Markdown</span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyContent(markdownContent, 'markdown')}
                    className="p-1 text-slate-500 hover:text-teal-600 transition-colors"
                    title="Copier le Markdown"
                  >
                    <Copy className="h-4 w-4" />
                    {copied === 'markdown' && (
                      <span className="absolute right-16 -mt-8 px-2 py-1 bg-slate-800 text-white text-xs rounded-md">
                        Copié !
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => downloadContent(markdownContent, 'markdown')}
                    className="p-1 text-slate-500 hover:text-teal-600 transition-colors"
                    title="Télécharger en Markdown"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <FileCode className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-sm text-slate-700">HTML</span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyContent(htmlContent, 'html')}
                    className="p-1 text-slate-500 hover:text-emerald-600 transition-colors"
                    title="Copier le HTML"
                  >
                    <Copy className="h-4 w-4" />
                    {copied === 'html' && (
                      <span className="absolute right-16 -mt-8 px-2 py-1 bg-slate-800 text-white text-xs rounded-md">
                        Copié !
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => downloadContent(htmlContent, 'html')}
                    className="p-1 text-slate-500 hover:text-emerald-600 transition-colors"
                    title="Télécharger en HTML"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center">
                  <FileJson className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm text-slate-700">Texte brut</span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyContent(textContent, 'text')}
                    className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                    title="Copier le texte brut"
                  >
                    <Copy className="h-4 w-4" />
                    {copied === 'text' && (
                      <span className="absolute right-16 -mt-8 px-2 py-1 bg-slate-800 text-white text-xs rounded-md">
                        Copié !
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => downloadContent(textContent, 'text')}
                    className="p-1 text-slate-500 hover:text-blue-600 transition-colors"
                    title="Télécharger en texte brut"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 