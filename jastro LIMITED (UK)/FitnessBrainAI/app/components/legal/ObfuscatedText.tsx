import React from 'react';

interface ObfuscatedTextProps {
  text: string;
  className?: string;
}

/**
 * Composant pour afficher du texte obfusqué difficile à copier/collecter par les crawlers
 */
export const ObfuscatedText: React.FC<ObfuscatedTextProps> = ({ text, className = '' }) => {
  // Insertion de caractères de largeur zéro entre chaque caractère
  const obfuscatedText = text.split('').join('\u200B');

  // Fonction pour empêcher la copie
  const preventCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Randomiser l'ordre visuel des caractères tout en gardant le bon ordre de lecture
  const scrambleText = () => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        style={{ 
          display: 'inline-block',
          textIndent: '0',
          letterSpacing: '0',
          direction: index % 2 === 0 ? 'ltr' : 'rtl',
          unicodeBidi: 'bidi-override',
          position: 'relative'
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <span 
      className={className} 
      onCopy={preventCopy} 
      onCut={preventCopy} 
      style={{ 
        userSelect: 'none', 
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
      title="Information protégée"
      aria-label={text}
      data-nocopy="true"
    >
      {obfuscatedText}
    </span>
  );
};

export default ObfuscatedText; 