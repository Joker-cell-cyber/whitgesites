/**
 * Utilitaires pour la conversion entre différents formats de texte
 */

/**
 * Convertit du Markdown en HTML simple
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown
    // Titres
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    
    // Gras et italique
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Listes
    .replace(/^\s*- (.*$)/gm, '<li>$1</li>')
    
    // Liens
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    
    // Paragraphes (doit être fait en dernier)
    .replace(/^(?!<[hl]|<li|$)(.+)$/gm, '<p>$1</p>');
  
  // Envelopper les listes
  const listItems = html.match(/<li>.*?<\/li>/g);
  if (listItems) {
    let wrappedList = '<ul>';
    listItems.forEach(item => {
      wrappedList += item;
    });
    wrappedList += '</ul>';
    
    // Remplacer tous les éléments de liste par la liste complète
    listItems.forEach(item => {
      html = html.replace(item, '');
    });
    html = html.replace(/<ul><\/ul>/, wrappedList);
  }
  
  // Ajouter la structure HTML de base
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CharmAI</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    h2 { color: #444; margin-top: 20px; }
    p { margin-bottom: 15px; }
    ul { margin-bottom: 15px; }
    li { margin-bottom: 5px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
}

/**
 * Convertit du Markdown en texte brut
 */
export function markdownToText(markdown: string): string {
  if (!markdown) return '';
  
  return markdown
    // Supprimer les titres Markdown
    .replace(/^# (.*$)/gm, '$1\n\n')
    .replace(/^## (.*$)/gm, '$1\n\n')
    .replace(/^### (.*$)/gm, '$1\n\n')
    
    // Supprimer le formatage gras et italique
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    
    // Conserver les listes mais supprimer les tirets
    .replace(/^\s*- (.*$)/gm, '• $1')
    
    // Remplacer les liens par leur texte
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)')
    
    // Normaliser les sauts de ligne
    .replace(/\n{3,}/g, '\n\n');
}

/**
 * Génère un nom de fichier sécurisé à partir d'un titre
 */
export function getSafeFileName(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/--+/g, '-') // Éviter les tirets multiples
    .trim();
}

/**
 * Télécharge un contenu sous forme de fichier
 */
export function downloadContent(content: string, fileName: string, mimeType: string): void {
  // Créer un blob avec le contenu
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  // Créer un lien de téléchargement et cliquer dessus
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  // Nettoyer
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 