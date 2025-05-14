import OpenAI from "openai";
import { z } from "zod";
import ISO6391 from 'iso-639-1';
import { franc } from 'franc';
import { countryCodes } from '../data/country-codes';

// Initialize the OpenAI client with the API key
export const openai = new OpenAI({
  apiKey: "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",
});

// Model to use - using GPT-4o mini instead of GPT-4o to reduce costs
const MODEL = "gpt-4o-mini";

export interface BlogGenerationParams {
  title: string;
  keywords: string[];
  category: string;
  tone: string;
  wordCount: number;
  outputFormat?: 'markdown' | 'html' | 'text';
  language?: string;
}

export async function generateBlogArticle(params: BlogGenerationParams): Promise<string> {
  const { title, keywords, category, tone, wordCount, outputFormat = 'markdown', language = 'fr' } = params;

  try {
    console.log(`Génération d'un article de ${wordCount} mots sur "${title}" au format ${outputFormat} en ${language}`);
    
    // Étape 1: Générer la structure de l'article (plan détaillé)
    console.log("Étape 1: Génération de la structure de l'article");
    const structure = await generateArticleStructure(title, keywords, category, tone, wordCount, language);
    
    // Étape 2: Calculer la répartition des mots par section
    console.log("Étape 2: Calcul de la répartition des mots");
    const sections = calculateWordDistribution(structure, wordCount);
    
    // Étape 3: Générer chaque section avec son nombre de mots spécifique
    console.log("Étape 3: Génération du contenu de chaque section");
    const generatedSections = await generateSections(sections, title, keywords, tone, outputFormat, language);
    
    // Étape 4: Assembler l'article complet
    console.log("Étape 4: Assemblage de l'article complet");
    const fullArticle = assembleArticle(generatedSections, outputFormat);
    
    // Vérification finale du nombre de mots
    const finalWordCount = countWords(fullArticle);
    console.log(`Article généré avec ${finalWordCount} mots sur ${wordCount} demandés (${Math.round((finalWordCount / wordCount) * 100)}%)`);
    
    return fullArticle;
  } catch (error) {
    console.error("Erreur lors de la génération de l'article:", error);
    throw new Error("Impossible de générer l'article. Veuillez réessayer plus tard.");
  }
}

// Fonction pour compter les mots de manière précise
function countWords(text: string): number {
  // Nettoyer le texte des caractères spéciaux et des espaces multiples
  const cleanText = text
    .replace(/[#*_]/g, '') // Supprimer les caractères markdown
    .replace(/\s+/g, ' ')  // Remplacer les espaces multiples par un seul espace
    .trim();
  
  // Compter les mots (séparés par des espaces)
  return cleanText.split(/\s+/).length;
}

// Fonction pour générer la structure de l'article
async function generateArticleStructure(
  title: string,
  keywords: string[],
  category: string,
  tone: string,
  wordCount: number,
  language: string = 'fr'
): Promise<{ title: string; sections: { heading: string; level: number }[] }> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `Tu es un expert en planification d'articles de blog optimisés pour le SEO. 
        Ta tâche est de créer une structure détaillée pour un article de blog de ${wordCount} mots.
        Crée un plan avec un titre principal (H1) et 4 à 8 sections (H2) selon la longueur demandée.
        Pour les articles plus longs (>1000 mots), ajoute également des sous-sections (H3) dans chaque section principale.
        Utilise les mots-clés fournis de manière stratégique dans les titres.
        La langue de l'article sera: ${language}.
        IMPORTANT: Tous les titres et sous-titres doivent être rédigés UNIQUEMENT en ${language}. 
        N'utilise AUCUN mot ou expression d'une autre langue.
        Réponds uniquement au format JSON avec la structure suivante:
        {
          "title": "Titre principal de l'article (H1)",
          "sections": [
            {"heading": "Introduction", "level": 2},
            {"heading": "Première section (H2)", "level": 2},
            {"heading": "Sous-section de la première section (H3)", "level": 3},
            ...
            {"heading": "Conclusion", "level": 2}
          ]
        }`
      },
      {
        role: "user",
        content: `Crée une structure d'article sur le sujet "${title}" dans la catégorie "${category}".
        Mots-clés à inclure: ${keywords.join(", ")}.
        Ton: ${tone}.
        Longueur totale: ${wordCount} mots.
        Langue: ${language}.
        
        Assure-toi que la structure soit logique et progressive, avec une introduction, 
        des sections principales développant différents aspects du sujet, et une conclusion.
        
        IMPORTANT: Tous les titres et sous-titres doivent être rédigés UNIQUEMENT en ${language}.
        N'utilise AUCUN mot ou expression d'une autre langue.`
      }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
    max_tokens: 1000
  });

  const structureJson = JSON.parse(response.choices[0]?.message?.content || '{"title":"","sections":[]}');
  return structureJson;
}

// Fonction pour calculer la répartition des mots par section
function calculateWordDistribution(
  structure: { title: string; sections: { heading: string; level: number }[] },
  totalWordCount: number
): { heading: string; level: number; wordCount: number }[] {
  const sections = structure.sections;
  
  // Réserver des mots pour le titre principal (environ 2% du total)
  const titleWordCount = Math.round(totalWordCount * 0.02);
  let remainingWords = totalWordCount - titleWordCount;
  
  // Identifier les niveaux de section présents
  const h2Sections = sections.filter(s => s.level === 2);
  const h3Sections = sections.filter(s => s.level === 3);
  
  // Calculer la répartition
  const result = [];
  
  // Ajouter le titre principal
  result.push({
    heading: structure.title,
    level: 1,
    wordCount: titleWordCount
  });
  
  // Si nous n'avons que des sections H2
  if (h3Sections.length === 0) {
    // Réserver des pourcentages spécifiques pour l'introduction et la conclusion
    const introPercentage = 0.15; // 15% pour l'introduction
    const conclusionPercentage = 0.20; // 20% pour la conclusion
    const remainingPercentage = 1 - (introPercentage + conclusionPercentage);
    
    // Calculer les mots pour l'introduction et la conclusion
    const introWords = Math.round(remainingWords * introPercentage);
    const conclusionWords = Math.round(remainingWords * conclusionPercentage);
    
    // Calculer les mots restants pour les autres sections
    const wordsForOtherSections = remainingWords - (introWords + conclusionWords);
    
    // Nombre de sections entre l'introduction et la conclusion
    const middleSectionsCount = Math.max(1, sections.length - 2);
    
    // Mots par section du milieu
    const wordsPerMiddleSection = Math.floor(wordsForOtherSections / middleSectionsCount);
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      let sectionWordCount;
      
      // Introduction
      if (i === 0) {
        sectionWordCount = introWords;
      } 
      // Conclusion
      else if (i === sections.length - 1) {
        sectionWordCount = conclusionWords;
      }
      // Sections du milieu
      else {
        sectionWordCount = wordsPerMiddleSection;
      }
      
      result.push({
        heading: section.heading,
        level: section.level,
        wordCount: sectionWordCount
      });
    }
  } 
  // Si nous avons des sections H2 et H3
  else {
    // Grouper les H3 sous leurs H2 parents
    const h2Groups: { [key: string]: { heading: string; level: number; subSections: { heading: string; level: number }[] } } = {};
    
    let currentH2 = "";
    for (const section of sections) {
      if (section.level === 2) {
        currentH2 = section.heading;
        h2Groups[currentH2] = {
          heading: section.heading,
          level: 2,
          subSections: []
        };
      } else if (section.level === 3 && currentH2) {
        h2Groups[currentH2].subSections.push(section);
      }
    }
    
    // Réserver des pourcentages spécifiques pour l'introduction et la conclusion
    const introPercentage = 0.15; // 15% pour l'introduction
    const conclusionPercentage = 0.20; // 20% pour la conclusion
    const remainingPercentage = 1 - (introPercentage + conclusionPercentage);
    
    // Calculer les mots pour l'introduction et la conclusion
    const introWords = Math.round(remainingWords * introPercentage);
    const conclusionWords = Math.round(remainingWords * conclusionPercentage);
    
    // Calculer les mots restants pour les autres groupes
    const wordsForOtherGroups = remainingWords - (introWords + conclusionWords);
    
    // Identifier les groupes d'introduction et de conclusion
    const h2GroupsArray = Object.values(h2Groups);
    const introGroup = h2GroupsArray[0];
    const conclusionGroup = h2GroupsArray[h2GroupsArray.length - 1];
    
    // Groupes du milieu (sans intro ni conclusion)
    const middleGroups = h2GroupsArray.slice(1, h2GroupsArray.length - 1);
    const wordsPerMiddleGroup = Math.floor(wordsForOtherGroups / Math.max(1, middleGroups.length));
    
    // Traiter chaque groupe
    for (let i = 0; i < h2GroupsArray.length; i++) {
      const group = h2GroupsArray[i];
      let groupWordCount;
      
      // Introduction
      if (i === 0) {
        groupWordCount = introWords;
      } 
      // Conclusion
      else if (i === h2GroupsArray.length - 1) {
        groupWordCount = conclusionWords;
      }
      // Groupes du milieu
      else {
        groupWordCount = wordsPerMiddleGroup;
      }
      
      // Ajouter la section H2 avec un pourcentage des mots du groupe
      // Pour l'intro et la conclusion, donner plus de poids à la section principale
      let h2Percentage;
      if (i === 0 || i === h2GroupsArray.length - 1) {
        h2Percentage = 0.4; // 40% pour l'intro/conclusion principale
      } else {
        h2Percentage = 0.2; // 20% pour les autres sections H2
      }
      
      const h2WordCount = Math.round(groupWordCount * h2Percentage);
      result.push({
        heading: group.heading,
        level: 2,
        wordCount: h2WordCount
      });
      
      // Répartir le reste des mots entre les sous-sections H3
      const remainingGroupWords = groupWordCount - h2WordCount;
      
      if (group.subSections.length > 0) {
        const wordsPerH3 = Math.floor(remainingGroupWords / group.subSections.length);
        
        for (const subSection of group.subSections) {
          result.push({
            heading: subSection.heading,
            level: 3,
            wordCount: wordsPerH3
          });
        }
      }
    }
  }
  
  // Vérifier que la somme des mots correspond au total demandé
  const totalCalculated = result.reduce((sum, section) => sum + section.wordCount, 0);
  
  // Ajuster la dernière section pour compenser toute différence
  if (totalCalculated !== totalWordCount && result.length > 1) {
    const lastSection = result[result.length - 1];
    lastSection.wordCount += (totalWordCount - totalCalculated);
  }
  
  return result;
}

// Fonction pour détecter la langue d'un texte (implémentation simplifiée)
function detectLanguage(text: string): string {
  // Dictionnaires de mots fréquents par langue
  const languagePatterns: Record<string, RegExp> = {
    fr: /\b(le|la|les|un|une|des|et|ou|en|dans|pour|avec|ce|cette|ces|est|sont|être|avoir|je|tu|il|elle|nous|vous|ils|elles)\b/gi,
    en: /\b(the|a|an|and|or|in|on|at|for|with|this|that|these|those|is|are|be|have|i|you|he|she|we|they)\b/gi,
    es: /\b(el|la|los|las|un|una|unos|unas|y|o|en|para|con|este|esta|estos|estas|es|son|ser|tener|yo|tú|él|ella|nosotros|vosotros|ellos|ellas)\b/gi,
    de: /\b(der|die|das|ein|eine|und|oder|in|auf|für|mit|dieser|diese|dieses|ist|sind|sein|haben|ich|du|er|sie|wir|ihr|sie)\b/gi,
  };

  // Compter les occurrences de mots par langue
  const counts: Record<string, number> = {};
  
  for (const [lang, pattern] of Object.entries(languagePatterns)) {
    const matches = text.match(pattern) || [];
    counts[lang] = matches.length;
  }
  
  // Trouver la langue avec le plus d'occurrences
  let maxLang = 'unknown';
  let maxCount = 0;
  
  for (const [lang, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxLang = lang;
    }
  }
  
  return maxLang;
}

// Fonction pour vérifier si le contenu est dans la langue demandée
function isContentInCorrectLanguage(content: string, targetLanguage: string): boolean {
  // Si le contenu est trop court, on ne peut pas vraiment déterminer la langue
  if (content.length < 50) return true;
  
  const detectedLanguage = detectLanguage(content);
  
  // Si la langue n'est pas détectée, on considère que c'est correct
  if (detectedLanguage === 'unknown') return true;
  
  // Vérifier si la langue détectée correspond à la langue cible
  return detectedLanguage === targetLanguage;
}

// Fonction pour générer le contenu de chaque section avec retry et timeout
async function generateSections(
  sections: { heading: string; level: number; wordCount: number }[],
  title: string,
  keywords: string[],
  tone: string,
  outputFormat: 'markdown' | 'html' | 'text' = 'markdown',
  language: string = 'fr'
): Promise<{ heading: string; level: number; content: string; wordCount: number }[]> {
  const result = [];
  
  // Déterminer les instructions de formatage en fonction du format de sortie
  let formatInstructions = '';
  if (outputFormat === 'markdown') {
    formatInstructions = `Utilise le format Markdown pour la mise en forme (gras, italique, listes, etc.).`;
  } else if (outputFormat === 'html') {
    formatInstructions = `Utilise des balises HTML pour la mise en forme (<strong>, <em>, <ul>, <li>, etc.).`;
  } else {
    formatInstructions = `Utilise un format texte simple sans mise en forme spéciale.`;
  }
  
  // Fonction pour générer une section avec retry
  const generateSectionWithRetry = async (section: { heading: string; level: number; wordCount: number }, maxRetries = 3, timeout = 30000) => {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        console.log(`Génération de la section "${section.heading}" (${section.wordCount} mots) en ${language} - Tentative ${retries + 1}/${maxRetries}`);
        
        // Sauter les sections avec 0 mots
        if (section.wordCount <= 0) return { content: '', wordCount: 0 };
        
        // Créer une promesse avec timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout dépassé pour la génération de section')), timeout);
        });
        
        // Créer la promesse de génération
        const generationPromise = openai.chat.completions.create({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: `Tu es un expert en rédaction d'articles de blog optimisés pour le SEO.
              Ta tâche est de rédiger une section d'article avec EXACTEMENT ${section.wordCount} mots, ni plus ni moins.
              Le contenu doit être informatif, engageant et optimisé pour les moteurs de recherche.
              Utilise un ton ${tone} et intègre naturellement les mots-clés fournis.
              N'inclus PAS le titre de la section dans ton texte, il sera ajouté séparément.
              La langue de l'article est: ${language}.
              IMPORTANT: Tu dois absolument rédiger tout le contenu UNIQUEMENT en ${language}, pas dans une autre langue.
              N'utilise AUCUN mot ou expression d'une autre langue, même pour les citations ou exemples.
              ${formatInstructions}
              Réponds uniquement avec le contenu de la section, sans ajouter de titre ni de compteur de mots.`
            },
            {
              role: "user",
              content: `Rédige la section "${section.heading}" pour un article intitulé "${title}".
              Mots-clés à inclure si pertinent: ${keywords.join(", ")}.
              Cette section doit faire EXACTEMENT ${section.wordCount} mots.
              Langue: ${language}.
              IMPORTANT: Le contenu doit être rédigé UNIQUEMENT en ${language}.
              N'utilise AUCUN mot ou expression d'une autre langue, même pour les citations ou exemples.
              
              Contexte: Cette section est de niveau H${section.level} dans l'article.
              ${section.heading === "Introduction" ? 
                "C'est l'introduction de l'article, elle doit présenter le sujet et donner envie de lire la suite." : 
                section.heading === "Conclusion" ? 
                "C'est la conclusion de l'article, elle doit résumer les points clés et inciter à l'action." : 
                `Cette section doit développer l'aspect "${section.heading}" du sujet principal.`}
              
              IMPORTANT: Le texte doit faire EXACTEMENT ${section.wordCount} mots, ni plus ni moins.`
            }
          ],
          temperature: 0.7,
          max_tokens: Math.max(section.wordCount * 7, 1000), // Estimation: 7 tokens par mot en moyenne
        });
        
        // Exécuter avec timeout
        const response = await Promise.race([generationPromise, timeoutPromise]) as any;
        
        const content = response.choices[0]?.message?.content?.trim() || '';
        
        // Vérifier le nombre de mots
        const actualWordCount = countWords(content);
        console.log(`Section générée avec ${actualWordCount} mots sur ${section.wordCount} demandés`);
        
        // Vérifier si le contenu est dans la bonne langue
        if (content.length > 0) {
          // Vérifier la langue du contenu
          const isCorrectLanguage = isContentInCorrectLanguage(content, language);
          
          if (!isCorrectLanguage) {
            console.warn(`La section "${section.heading}" semble être dans une langue différente de ${language}. Réessai...`);
            throw new Error(`Contenu généré dans la mauvaise langue`);
          }
          
          // Si le contenu est généré avec succès et dans la bonne langue, le retourner
          return { content, wordCount: actualWordCount };
        } else {
          throw new Error('Contenu vide généré');
        }
      } catch (error) {
        retries++;
        console.error(`Erreur lors de la génération de la section "${section.heading}" (tentative ${retries}/${maxRetries}):`, error);
        
        // Si c'est la dernière tentative, générer un contenu de secours
        if (retries >= maxRetries) {
          console.log(`Génération d'un contenu de secours pour la section "${section.heading}"`);
          
          // Générer un contenu de secours simple dans la langue demandée
          let fallbackContent = '';
          
          if (language === 'fr') {
            fallbackContent = `Cette section n'a pas pu être générée correctement. Veuillez réessayer la génération de l'article.`;
          } else if (language === 'en') {
            fallbackContent = `This section could not be generated correctly. Please try regenerating the article.`;
          } else if (language === 'es') {
            fallbackContent = `Esta sección no se pudo generar correctamente. Por favor, intente regenerar el artículo.`;
          } else if (language === 'de') {
            fallbackContent = `Dieser Abschnitt konnte nicht korrekt generiert werden. Bitte versuchen Sie, den Artikel neu zu generieren.`;
          } else {
            // Contenu par défaut en anglais si la langue n'est pas reconnue
            fallbackContent = `This section could not be generated correctly. Please try regenerating the article.`;
          }
          
          return { content: fallbackContent, wordCount: fallbackContent.split(/\s+/).length };
        }
        
        // Attendre avant de réessayer (backoff exponentiel)
        const waitTime = Math.pow(2, retries) * 1000;
        console.log(`Attente de ${waitTime}ms avant de réessayer...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // Ne devrait jamais arriver ici, mais au cas où
    return { content: '', wordCount: 0 };
  };
  
  // Traiter chaque section, une par une pour éviter de surcharger l'API
  for (const section of sections) {
    const { content, wordCount } = await generateSectionWithRetry(section);
    
    result.push({
      heading: section.heading,
      level: section.level,
      content,
      wordCount
    });
  }
  
  return result;
}

// Fonction pour assembler l'article complet
function assembleArticle(
  sections: { heading: string; level: number; content: string; wordCount: number }[],
  outputFormat: 'markdown' | 'html' | 'text' = 'markdown'
): string {
  let article = "";
  
  if (outputFormat === 'markdown') {
    // Format Markdown
    for (const section of sections) {
      // Ajouter le titre de la section avec le bon niveau de markdown
      if (section.level === 1) {
        article += `# ${section.heading}\n\n`;
      } else if (section.level === 2) {
        article += `## ${section.heading}\n\n`;
      } else if (section.level === 3) {
        article += `### ${section.heading}\n\n`;
      }
      
      // Ajouter le contenu de la section
      article += `${section.content}\n\n`;
    }
  } else if (outputFormat === 'html') {
    // Format HTML
    article += '<article class="blog-article">\n';
    
    for (const section of sections) {
      // Ajouter le titre de la section avec le bon niveau HTML
      if (section.level === 1) {
        article += `<h1 class="article-title">${section.heading}</h1>\n`;
      } else if (section.level === 2) {
        article += `<h2 class="article-subtitle">${section.heading}</h2>\n`;
      } else if (section.level === 3) {
        article += `<h3 class="article-subsubtitle">${section.heading}</h3>\n`;
      }
      
      // Ajouter le contenu de la section
      article += `${section.content}\n`;
    }
    
    article += '</article>';
  } else if (outputFormat === 'text') {
    // Format texte brut
    for (const section of sections) {
      // Ajouter le titre de la section
      if (section.level === 1) {
        article += `${section.heading.toUpperCase()}\n\n`;
      } else if (section.level === 2) {
        article += `${section.heading}\n\n`;
      } else if (section.level === 3) {
        article += `${section.heading}\n\n`;
      }
      
      // Ajouter le contenu de la section
      article += `${section.content}\n\n`;
    }
  }
  
  return article.trim();
}

/**
 * Génère un article avec OpenAI
 */
export async function generateArticle(
  subject: string,
  keywords: string[] = [],
  tone: string = 'professionnel',
  length: 'court' | 'moyen' | 'long' = 'moyen',
  language: string = 'fr'
) {
  // Déterminer le nombre de mots en fonction de la longueur demandée
  let wordCount = 800; // moyen par défaut
  if (length === 'court') wordCount = 400;
  if (length === 'long') wordCount = 1500;
  
  // Construire le prompt pour OpenAI
  const keywordsText = keywords.length > 0 ? `Mots-clés à inclure: ${keywords.join(', ')}` : '';
  
  const prompt = `
    Génère un article de blog sur le sujet suivant: "${subject}".
    
    ${keywordsText}
    
    Ton de l'article: ${tone}
    Longueur approximative: ${wordCount} mots
    Langue: ${language}
    
    L'article doit être bien structuré avec:
    - Un titre accrocheur
    - Une introduction engageante
    - Des sous-titres pertinents
    - Des paragraphes bien organisés
    - Une conclusion
    
    Optimise l'article pour le référencement (SEO) en:
    - Utilisant les mots-clés de manière naturelle
    - Créant des sous-titres pertinents (H2, H3)
    - Incluant une méta-description
    
    Format de sortie:
    # Titre
    
    Méta-description: Une description SEO de 150-160 caractères
    
    ## Introduction
    
    [Contenu...]
    
    ## [Sous-titre 1]
    
    [Contenu...]
    
    ## [Sous-titre 2]
    
    [Contenu...]
    
    ## Conclusion
    
    [Contenu...]
    
    IMPORTANT: L'article doit être rédigé UNIQUEMENT en ${language}.
    N'utilise AUCUN mot ou expression d'une autre langue, même pour les citations ou exemples.
  `;
  
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `Tu es un rédacteur web professionnel spécialisé dans la création de contenu SEO de haute qualité. 
          Tu dois rédiger UNIQUEMENT en ${language}. 
          Assure-toi que tout le contenu généré est dans cette langue.
          N'utilise AUCUN mot ou expression d'une autre langue, même pour les citations ou exemples.
          Si tu dois mentionner des termes techniques ou des noms propres qui n'existent pas dans la langue cible, utilise la version la plus proche dans cette langue.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });
    
    const generatedContent = response.choices[0].message.content || '';
    
    // Extraire le titre et le contenu
    const titleMatch = generatedContent.match(/# (.*?)(\n|$)/);
    const title = titleMatch ? titleMatch[1].trim() : subject;
    
    // Calculer le nombre de tokens utilisés
    const tokensUsed = response.usage?.total_tokens || 0;
    
    return {
      title,
      content: generatedContent,
      tokensUsed: Math.ceil(tokensUsed / 1000), // Convertir en "tokens" de notre application
      keywords,
      language
    };
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    throw new Error('Échec de la génération de l\'article. Veuillez réessayer.');
  }
}

/**
 * Analyse SEO d'un article
 */
export async function analyzeSEO(content: string, keywords: string[] = []) {
  const prompt = `
    Analyse le contenu suivant d'un point de vue SEO et fournit des recommandations d'amélioration:
    
    ${content.substring(0, 8000)}... // Limiter la taille pour éviter de dépasser les limites de tokens
    
    Mots-clés cibles: ${keywords.join(', ')}
    
    Fournir une analyse détaillée incluant:
    1. Score SEO global (0-100)
    2. Densité des mots-clés
    3. Structure du contenu (titres, sous-titres)
    4. Lisibilité
    5. Longueur du contenu
    6. Recommandations spécifiques pour améliorer le référencement
    
    Format de sortie JSON:
    {
      "score": 85,
      "keywordDensity": {
        "keyword1": 1.2,
        "keyword2": 0.8
      },
      "structure": "Bien structuré avec des H2 et H3",
      "readability": "Bonne",
      "contentLength": "Appropriée",
      "recommendations": [
        {"type": "title", "suggestion": "Ajouter le mot-clé principal dans le titre", "impact": "high"},
        {"type": "content", "suggestion": "Augmenter la densité du mot-clé X", "impact": "medium"}
      ]
    }
  `;
  
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'Tu es un expert en SEO qui analyse et fournit des recommandations précises pour améliorer le référencement des contenus web.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });
    
    const analysisText = response.choices[0].message.content || '{}';
    const analysis = JSON.parse(analysisText);
    
    // Calculer le nombre de tokens utilisés
    const tokensUsed = response.usage?.total_tokens || 0;
    
    return {
      ...analysis,
      tokensUsed: Math.ceil(tokensUsed / 1000) // Convertir en "tokens" de notre application
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse SEO:', error);
    throw new Error('Échec de l\'analyse SEO. Veuillez réessayer.');
  }
} 