/**
 * Utilitaires de formatage pour les données numériques
 */

/**
 * Formate un nombre avec séparateurs de milliers
 * @param value Nombre à formater
 * @param decimals Nombre de décimales à afficher
 * @returns Nombre formaté
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(value);
}

/**
 * Formate un montant en devise
 * @param value Montant à formater
 * @param currency Code de la devise (EUR, USD, etc.)
 * @param decimals Nombre de décimales à afficher
 * @returns Montant formaté avec symbole de devise
 */
export function formatCurrency(value: number, currency: string = 'EUR', decimals: number = 2): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(value);
}

/**
 * Formate un pourcentage
 * @param value Valeur décimale à formater (0.1 = 10%)
 * @param decimals Nombre de décimales à afficher
 * @returns Pourcentage formaté
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(value);
}

/**
 * Formate une date
 * @param date Date à formater (string ou Date)
 * @param includeTime Inclure l'heure
 * @returns Date formatée
 */
export function formatDate(date: string | Date, includeTime: boolean = false): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (includeTime) {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  }
  
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Tronque un texte s'il dépasse une certaine longueur
 * @param text Texte à tronquer
 * @param maxLength Longueur maximale
 * @returns Texte tronqué avec des points de suspension si nécessaire
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Convertit du Markdown en HTML
 * @param markdown Texte en Markdown
 * @returns HTML généré
 */
export function markdownToHtml(markdown: string): string {
  // Implémentation simplifiée
  let html = markdown
    // Titres
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    // Paragraphes
    .replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote)(.+)$/gm, '<p>$1</p>')
    // Gras et italique
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Listes
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    // Nettoyer les sauts de ligne multiples
    .replace(/\n\n+/g, '\n\n');
  
  // Envelopper les listes
  html = html.replace(/<li>(.*?)<\/li>\n<li>/g, '<li>$1</li>\n<li>');
  html = html.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/g, '');
  
  return html;
}

/**
 * Convertit du Markdown en texte brut
 * @param markdown Texte en Markdown
 * @returns Texte brut
 */
export function markdownToText(markdown: string): string {
  return markdown
    // Supprimer les titres
    .replace(/^# (.*?)$/gm, '$1\n\n')
    .replace(/^## (.*?)$/gm, '$1\n\n')
    .replace(/^### (.*?)$/gm, '$1\n\n')
    // Supprimer les styles
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Conserver les listes
    .replace(/^- (.*?)$/gm, '• $1')
    // Nettoyer les sauts de ligne multiples
    .replace(/\n\n+/g, '\n\n');
}

/**
 * Générer un nom de fichier sécurisé
 * @param name Nom à transformer
 * @returns Nom de fichier sécurisé
 */
export function getSafeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-')     // Remplacer les espaces par des tirets
    .replace(/-+/g, '-')      // Éviter les tirets multiples
    .trim();
}

/**
 * Télécharger un contenu sous forme de fichier
 * @param content Contenu à télécharger
 * @param fileName Nom du fichier
 * @param mimeType Type MIME du fichier
 */
export function downloadContent(content: string, fileName: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 