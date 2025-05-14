import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { downloadContent, markdownToHtml, markdownToText, getSafeFileName } from '@/app/lib/format-utils';

interface ExportDialogProps {
  content?: string;
  htmlContent?: string;
  textContent?: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDialog({ 
  content, 
  htmlContent, 
  textContent, 
  title, 
  isOpen, 
  onClose 
}: ExportDialogProps) {
  const [format, setFormat] = useState<'markdown' | 'html' | 'text'>('markdown');
  
  // Si nous n'avons que du HTML, passer à l'onglet HTML
  useState(() => {
    if (!content && htmlContent) {
      setFormat('html');
    }
  });
  
  if (!isOpen) return null;
  
  const handleExport = () => {
    const safeFileName = getSafeFileName(title);
    let exportContent = '';
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    // Déterminer le contenu à exporter en fonction du format
    if (format === 'html') {
      if (htmlContent) {
        exportContent = htmlContent;
      } else if (content) {
        exportContent = markdownToHtml(content);
      }
      mimeType = 'text/html';
      extension = 'html';
    } else if (format === 'text') {
      if (textContent) {
        exportContent = textContent;
      } else if (htmlContent) {
        exportContent = htmlContent.replace(/<[^>]*>/g, '');
      } else if (content) {
        exportContent = markdownToText(content);
      }
    } else {
      // Markdown reste tel quel
      exportContent = content || '';
      extension = 'md';
    }
    
    // Télécharger le fichier
    downloadContent(
      exportContent, 
      `description-${safeFileName}.${extension}`, 
      mimeType
    );
    
    // Fermer le dialogue après l'export
    onClose();
  };
  
  // Vérifier si le format markdown est disponible
  const hasMarkdown = !!content;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border border-slate-200 shadow-lg rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Exporter la description</h2>
        
        <div className="mb-6">
          <p className="text-slate-600 mb-3">Choisissez le format d'exportation :</p>
          
          <div className="space-y-2">
            {hasMarkdown && (
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  checked={format === 'markdown'}
                  onChange={() => setFormat('markdown')}
                  className="text-amber-600"
                />
                <span className="text-slate-800">Markdown (.md)</span>
                <span className="text-slate-500 text-xs ml-2">- Format recommandé pour préserver la mise en forme</span>
              </label>
            )}
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'html'}
                onChange={() => setFormat('html')}
                className="text-amber-600"
              />
              <span className="text-slate-800">HTML (.html)</span>
              <span className="text-slate-500 text-xs ml-2">- Pour l'intégration web directe</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'text'}
                onChange={() => setFormat('text')}
                className="text-amber-600"
              />
              <span className="text-slate-800">Texte brut (.txt)</span>
              <span className="text-slate-500 text-xs ml-2">- Sans mise en forme</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Annuler
          </Button>
          
          <Button
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            onClick={handleExport}
          >
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
} 