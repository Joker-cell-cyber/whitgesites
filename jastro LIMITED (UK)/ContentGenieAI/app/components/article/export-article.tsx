'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";

interface ExportArticleProps {
  title: string;
  markdownContent: string;
  htmlContent: string | null;
  textContent: string | null;
}

export default function ExportArticle({
  title,
  markdownContent,
  htmlContent,
  textContent
}: ExportArticleProps) {
  const [exportFormat, setExportFormat] = useState<'markdown' | 'html' | 'text'>('markdown');

  // Fonction pour générer un nom de fichier sécurisé
  const getSafeFileName = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/--+/g, '-') // Éviter les tirets multiples
      .trim();
  };

  // Fonction pour exporter le contenu dans le format sélectionné
  const exportContent = () => {
    let content = '';
    let fileExtension = '';
    let mimeType = '';

    switch (exportFormat) {
      case 'markdown':
        content = markdownContent;
        fileExtension = 'md';
        mimeType = 'text/markdown';
        break;
      case 'html':
        content = htmlContent || '';
        fileExtension = 'html';
        mimeType = 'text/html';
        break;
      case 'text':
        content = textContent || '';
        fileExtension = 'txt';
        mimeType = 'text/plain';
        break;
    }

    // Créer un blob avec le contenu
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    // Créer un lien de téléchargement et cliquer dessus
    const a = document.createElement('a');
    a.href = url;
    a.download = `${getSafeFileName(title)}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3 className="text-white text-sm font-medium mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Exporter l'article
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Format d'exportation
          </label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'markdown' | 'html' | 'text')}
            className="w-full rounded-md border-purple-500/20 bg-black/40 text-white"
          >
            <option value="markdown">Markdown (.md)</option>
            <option value="html">HTML (.html)</option>
            <option value="text">Texte brut (.txt)</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <Button
            onClick={exportContent}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        {exportFormat === 'markdown' && (
          <p>Le format Markdown est idéal pour une édition ultérieure ou pour l'intégration dans des systèmes qui supportent ce format.</p>
        )}
        {exportFormat === 'html' && (
          <p>Le format HTML est parfait pour une intégration directe dans un site web ou un blog.</p>
        )}
        {exportFormat === 'text' && (
          <p>Le format texte brut est utile pour une compatibilité maximale avec tous les éditeurs de texte.</p>
        )}
      </div>
    </div>
  );
} 