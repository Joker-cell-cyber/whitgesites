import { useState } from 'react';
import { markdownToHtml, markdownToText } from '@/app/lib/format-utils';

interface PreviewTabsProps {
  markdown: string;
}

export function PreviewTabs({ markdown }: PreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<'markdown' | 'html' | 'text'>('markdown');
  
  // Convertir le contenu selon le format sélectionné
  const getContent = () => {
    switch (activeTab) {
      case 'html':
        // Pour l'aperçu HTML, on extrait juste le contenu du body
        const htmlContent = markdownToHtml(markdown);
        const bodyContent = htmlContent.match(/<body>([\s\S]*)<\/body>/)?.[1] || '';
        return bodyContent;
      case 'text':
        return markdownToText(markdown);
      default:
        return markdown;
    }
  };
  
  return (
    <div className="mt-4">
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'markdown' 
              ? 'text-purple-400 border-b-2 border-purple-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('markdown')}
        >
          Markdown
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'html' 
              ? 'text-purple-400 border-b-2 border-purple-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('html')}
        >
          HTML
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'text' 
              ? 'text-purple-400 border-b-2 border-purple-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('text')}
        >
          Texte brut
        </button>
      </div>
      
      <div className="mt-4 p-4 bg-gray-900 rounded-md overflow-auto max-h-[500px]">
        {activeTab === 'markdown' && (
          <div className="prose prose-invert max-w-none">
            {markdown.split('\n').map((paragraph, index) => (
              paragraph.startsWith('#') ? (
                paragraph.startsWith('# ') ? (
                  <h1 key={index} className="text-2xl font-bold mb-4 text-white">{paragraph.substring(2)}</h1>
                ) : paragraph.startsWith('## ') ? (
                  <h2 key={index} className="text-xl font-bold mb-3 text-white">{paragraph.substring(3)}</h2>
                ) : (
                  <h3 key={index} className="text-lg font-bold mb-2 text-white">{paragraph.substring(4)}</h3>
                )
              ) : paragraph.startsWith('- ') ? (
                <li key={index} className="mb-1 text-gray-300 ml-4">{paragraph.substring(2)}</li>
              ) : paragraph.trim() === '' ? (
                <div key={index} className="h-4"></div>
              ) : paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                <p key={index} className="mb-4 text-gray-200 font-semibold">
                  {paragraph.substring(2, paragraph.length - 2)}
                </p>
              ) : (
                <p key={index} className="mb-4 text-gray-300">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        )}
        
        {activeTab === 'html' && (
          <div 
            className="text-gray-300 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: getContent() }}
          />
        )}
        
        {activeTab === 'text' && (
          <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
            {getContent()}
          </pre>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        <p>
          {activeTab === 'markdown' && "Format Markdown - Idéal pour conserver la mise en forme et l'éditer ultérieurement"}
          {activeTab === 'html' && "Format HTML - Prêt à être intégré dans un site web"}
          {activeTab === 'text' && "Format texte brut - Sans mise en forme, compatible avec tous les éditeurs"}
        </p>
      </div>
    </div>
  );
} 