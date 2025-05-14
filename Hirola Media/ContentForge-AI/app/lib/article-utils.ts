/**
 * Utilitaires pour la génération d'articles
 */

/**
 * Calcule le coût en tokens en fonction du nombre de mots
 */
export const calculateTokenCost = (wordCount: number): number => {
  // 1 token pour 500 mots
  return Math.ceil(wordCount / 500);
};

/**
 * Convertit le nombre de mots en longueur pour l'API
 */
export const wordCountToLength = (wordCount: number): 'short' | 'medium' | 'long' => {
  if (wordCount <= 300) return 'short';
  if (wordCount <= 800) return 'medium';
  return 'long';
};

/**
 * Extrait le titre d'un article à partir du contenu markdown
 */
export const extractArticleTitle = (markdownContent: string): string => {
  if (!markdownContent) return 'Article généré';
  
  const lines = markdownContent.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.substring(2).trim();
    }
  }
  
  return 'Article généré';
};

/**
 * Convertit le contenu markdown en HTML simple
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  
  return markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />')
    .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
    .replace(/\n$/gm, '<br />')
    .replace(/^(?!\<)(.+)/gm, '<p>$1</p>')
    .replace(/^\s*[\r\n]/gm, '');
};

/**
 * Convertit le contenu markdown en texte brut
 */
export const markdownToText = (markdown: string): string => {
  if (!markdown) return '';
  
  return markdown
    .replace(/^# (.*$)/gm, '$1\n')
    .replace(/^## (.*$)/gm, '$1\n')
    .replace(/^### (.*$)/gm, '$1\n')
    .replace(/^#### (.*$)/gm, '$1\n')
    .replace(/^##### (.*$)/gm, '$1\n')
    .replace(/^###### (.*$)/gm, '$1\n')
    .replace(/^\> (.*$)/gm, '$1\n')
    .replace(/\*\*(.*)\*\*/gm, '$1')
    .replace(/\*(.*)\*/gm, '$1')
    .replace(/!\[(.*?)\]\((.*?)\)/gm, '')
    .replace(/\[(.*?)\]\((.*?)\)/gm, '$1')
    .replace(/\n$/gm, '\n\n');
}; 