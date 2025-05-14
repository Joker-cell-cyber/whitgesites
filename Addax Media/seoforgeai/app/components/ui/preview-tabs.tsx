import { useState } from 'react';
import { markdownToHtml, markdownToText } from '@/app/lib/format-utils';

interface PreviewTabsProps {
  markdown?: string;
  htmlContent?: string;
}

export function PreviewTabs({ markdown, htmlContent }: PreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<'markdown' | 'html' | 'text'>('markdown');
  
  const content = markdown || htmlContent || '';
  const isHtmlOnly = !markdown && htmlContent;
  
  // Si nous avons seulement du HTML, commencer avec l'onglet HTML
  useState(() => {
    if (isHtmlOnly) {
      setActiveTab('html');
    }
  });
  
  // Convertir le contenu selon le format sélectionné
  const getContent = () => {
    switch (activeTab) {
      case 'html':
        if (isHtmlOnly) return htmlContent;
        // Pour l'aperçu HTML, on extrait juste le contenu du body
        const convertedHtml = markdownToHtml(content);
        const bodyContent = convertedHtml.match(/<body>([\s\S]*)<\/body>/)?.[1] || '';
        return bodyContent;
      case 'text':
        if (isHtmlOnly) {
          // Enlever les balises HTML pour avoir du texte brut
          return htmlContent?.replace(/<[^>]*>/g, '') || '';
        }
        return markdownToText(content);
      default:
        return content;
    }
  };
  
  return (
    <div className="mt-4">
      <div className="flex border-b border-slate-200">
        {!isHtmlOnly && (
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'markdown' 
                ? 'text-amber-600 border-b-2 border-amber-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('markdown')}
          >
            Markdown
          </button>
        )}
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'html' 
              ? 'text-amber-600 border-b-2 border-amber-600' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
          onClick={() => setActiveTab('html')}
        >
          HTML
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'text' 
              ? 'text-amber-600 border-b-2 border-amber-600' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
          onClick={() => setActiveTab('text')}
        >
          Texte brut
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-white border border-slate-200 rounded-md overflow-auto max-h-[500px]">
        {activeTab === 'markdown' && !isHtmlOnly && (
          <div className="prose max-w-none">
            {content.split('\n').map((paragraph, index) => (
              paragraph.startsWith('#') ? (
                paragraph.startsWith('# ') ? (
                  <h1 key={index} className="text-2xl font-bold mb-4 text-slate-800">{paragraph.substring(2)}</h1>
                ) : paragraph.startsWith('## ') ? (
                  <h2 key={index} className="text-xl font-bold mb-3 text-slate-800">{paragraph.substring(3)}</h2>
                ) : (
                  <h3 key={index} className="text-lg font-bold mb-2 text-slate-800">{paragraph.substring(4)}</h3>
                )
              ) : paragraph.startsWith('- ') ? (
                <li key={index} className="mb-1 text-slate-700 ml-4">{paragraph.substring(2)}</li>
              ) : paragraph.trim() === '' ? (
                <div key={index} className="h-4"></div>
              ) : paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                <p key={index} className="mb-4 text-slate-800 font-semibold">
                  {paragraph.substring(2, paragraph.length - 2)}
                </p>
              ) : (
                <p key={index} className="mb-4 text-slate-700">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        )}
        
        {activeTab === 'html' && (
          <div 
            className="text-slate-700 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: getContent() }}
          />
        )}
        
        {activeTab === 'text' && (
          <pre className="text-slate-700 font-mono text-sm whitespace-pre-wrap">
            {getContent()}
          </pre>
        )}
      </div>
      
      <div className="mt-2 text-xs text-slate-500">
        <p>
          {activeTab === 'markdown' && "Format Markdown - Idéal pour conserver la mise en forme et l'éditer ultérieurement"}
          {activeTab === 'html' && "Format HTML - Prêt à être intégré dans un site web"}
          {activeTab === 'text' && "Format texte brut - Sans mise en forme, compatible avec tous les éditeurs"}
        </p>
      </div>
    </div>
  );
} 