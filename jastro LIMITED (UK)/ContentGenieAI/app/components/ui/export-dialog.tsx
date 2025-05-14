import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { downloadContent, markdownToHtml, markdownToText, getSafeFileName } from '@/app/lib/format-utils';

interface ExportDialogProps {
  content: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDialog({ content, productName, isOpen, onClose }: ExportDialogProps) {
  const [format, setFormat] = useState<'markdown' | 'html' | 'text'>('markdown');
  
  if (!isOpen) return null;
  
  const handleExport = () => {
    const safeFileName = getSafeFileName(productName);
    let exportContent = content;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    // Convertir selon le format choisi
    if (format === 'html') {
      exportContent = markdownToHtml(content);
      mimeType = 'text/html';
      extension = 'html';
    } else if (format === 'text') {
      exportContent = markdownToText(content);
    } else {
      // Markdown reste tel quel
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
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-4">Exporter la description</h2>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-3">Choisissez le format d'exportation :</p>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'markdown'}
                onChange={() => setFormat('markdown')}
                className="text-purple-600"
              />
              <span className="text-white">Markdown (.md)</span>
              <span className="text-gray-400 text-xs ml-2">- Format recommandé pour préserver la mise en forme</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'html'}
                onChange={() => setFormat('html')}
                className="text-purple-600"
              />
              <span className="text-white">HTML (.html)</span>
              <span className="text-gray-400 text-xs ml-2">- Pour l'intégration web directe</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === 'text'}
                onChange={() => setFormat('text')}
                className="text-purple-600"
              />
              <span className="text-white">Texte brut (.txt)</span>
              <span className="text-gray-400 text-xs ml-2">- Sans mise en forme</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
          
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={handleExport}
          >
            Exporter
          </Button>
        </div>
      </div>
    </div>
  );
} 