import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getUserProfile } from '@/app/lib/auth-service';
import { recordGeneration } from '@/app/lib/server-state';
import { generateProductDescription } from '@/app/lib/ai-service';
import { fetchGenerationStats, updateStatsAfterGeneration, invalidateStatsCache } from '@/app/lib/stats-service';

// Initialiser le client OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Modèle à utiliser - GPT-4o mini au lieu de GPT-4o pour réduire les coûts
const MODEL = "gpt-4o-mini";

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

// Fonction pour générer une description de produit avec retry et vérification de langue
async function generateProductDescriptionWithRetry(
  prompt: string, 
  systemPrompt: string, 
  language: string,
  maxRetries = 3, 
  timeout = 30000
): Promise<string> {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`Génération de description de produit en ${language} - Tentative ${retries + 1}/${maxRetries}`);
      
      // Créer une promesse avec timeout
      const timeoutPromise = new Promise<any>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout dépassé pour la génération de description')), timeout);
      });
      
      // Créer la promesse de génération
      const generationPromise = openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      
      // Exécuter avec timeout
      const response = await Promise.race([generationPromise, timeoutPromise]);
      
      const generatedContent = response.choices[0].message.content || '';
      
      // Vérifier si le contenu est dans la bonne langue
      if (generatedContent.length > 0) {
        const isCorrectLanguage = isContentInCorrectLanguage(generatedContent, language);
        
        if (!isCorrectLanguage) {
          console.warn(`La description de produit semble être dans une langue différente de ${language}. Réessai...`);
          throw new Error(`Contenu généré dans la mauvaise langue`);
        }
        
        // Si le contenu est généré avec succès et dans la bonne langue, le retourner
        return generatedContent;
      } else {
        throw new Error('Contenu vide généré');
      }
    } catch (error) {
      retries++;
      console.error(`Erreur lors de la génération de la description de produit (tentative ${retries}/${maxRetries}):`, error);
      
      // Si c'est la dernière tentative, générer un contenu de secours
      if (retries >= maxRetries) {
        console.log(`Génération d'un contenu de secours pour la description de produit`);
        
        // Générer un contenu de secours simple dans la langue demandée
        let fallbackContent = '';
        
        if (language === 'fr') {
          fallbackContent = `# ${prompt.split('\n')[3].replace('- Nom: ', '')}
          
## Attention

Cette description n'a pas pu être générée correctement. Veuillez réessayer la génération.

## Intérêt

Nous nous excusons pour ce problème technique.

## Désir

Veuillez réessayer ultérieurement.

## Action

Contactez notre support si le problème persiste.`;
        } else if (language === 'en') {
          fallbackContent = `# ${prompt.split('\n')[3].replace('- Nom: ', '')}
          
## Attention

This description could not be generated correctly. Please try again.

## Interest

We apologize for this technical issue.

## Desire

Please try again later.

## Action

Contact our support if the problem persists.`;
        } else if (language === 'es') {
          fallbackContent = `# ${prompt.split('\n')[3].replace('- Nom: ', '')}
          
## Atención

Esta descripción no se pudo generar correctamente. Por favor, inténtelo de nuevo.

## Interés

Nos disculpamos por este problema técnico.

## Deseo

Por favor, inténtelo más tarde.

## Acción

Contacte con nuestro soporte si el problema persiste.`;
        } else {
          // Contenu par défaut en anglais si la langue n'est pas reconnue
          fallbackContent = `# ${prompt.split('\n')[3].replace('- Nom: ', '')}
          
## Attention

This description could not be generated correctly. Please try again.

## Interest

We apologize for this technical issue.

## Desire

Please try again later.

## Action

Contact our support if the problem persists.`;
        }
        
        return fallbackContent;
      }
      
      // Attendre avant de réessayer (backoff exponentiel)
      const waitTime = Math.pow(2, retries) * 1000;
      console.log(`Attente de ${waitTime}ms avant de réessayer...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  // Ne devrait jamais arriver ici, mais au cas où
  return '';
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Vérifier que l'utilisateur est connecté
    if (!data.memberId) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour générer une description de produit' },
        { status: 401 }
      );
    }

    // Vérifier le solde de tokens de l'utilisateur
    const userProfile = await getUserProfile(data.memberId);
    const tokenCost = Math.ceil((data.wordCount || 200) / 100); // 1 token pour 100 mots
    
    if (userProfile.tokenBalance < tokenCost) {
      return NextResponse.json(
        { error: `Solde de tokens insuffisant. Vous avez besoin de ${tokenCost} tokens pour cette génération.` },
        { status: 402 }
      );
    }
    
    // Construire le prompt pour OpenAI
    const prompt = `
Génère une description de produit persuasive au format AIDA (Attention, Intérêt, Désir, Action) en utilisant les informations suivantes:

INFORMATIONS PRODUIT:
- Nom: ${data.name}
- Catégorie: ${data.category}${data.subcategory ? `\n- Sous-catégorie: ${data.subcategory}` : ''}
- Public cible: ${data.targetAudience}
- USP (Proposition unique de vente): ${data.usp}

ÉLÉMENTS SEO & CONVERSION:
- Mot-clé principal: ${data.mainKeyword || 'Non spécifié'}
- Variations sémantiques: ${data.semanticVariations || 'Non spécifié'}
- Intention d'achat: ${data.purchaseIntent || 'Non spécifié'}
- Douleurs clients à résoudre: ${data.customerPains || 'Non spécifié'}
- Émotions à déclencher: ${data.emotions.length > 0 ? data.emotions.join(', ') : 'Non spécifié'}
- CTA (Call to Action): ${data.cta || 'Acheter maintenant'}

SPÉCIFICATIONS TECHNIQUES:
- Matériaux/Composition: ${data.materials || 'Non spécifié'}
- Certifications: ${data.certifications.length > 0 ? data.certifications.join(', ') : 'Non spécifié'}
- Avantages uniques: ${data.uniqueAdvantages || 'Non spécifié'}
- Éco-score (1-5): ${data.ecoScore || 3}

TON & STYLE:
- Ton souhaité: ${data.tone || 'Expert technique'}
- Éléments stylistiques: ${data.styleElements.length > 0 ? data.styleElements.join(', ') : 'Non spécifié'}
- Mots interdits: ${data.forbiddenWords || 'Non spécifié'}

OPTIONS AVANCÉES:
- Longueur cible: ${data.wordCount || 200} mots
- Liens internes: ${data.internalLinks || 'Non spécifié'}
- Langue: ${data.language || 'fr'}

INSTRUCTIONS SPÉCIFIQUES:
1. Utilise le format AIDA (Attention, Intérêt, Désir, Action) avec des sections clairement marquées en utilisant les titres Markdown (## pour les sections).
2. Commence par le titre (nom du produit) en utilisant # et l'USP en gras (**texte**).
3. La section "## Attention" doit capter l'intérêt en évoquant un problème que le produit résout.
4. La section "## Intérêt" doit présenter les caractéristiques principales et avantages du produit.
5. La section "## Désir" doit créer une connexion émotionnelle et montrer comment le produit améliore la vie.
6. La section "## Action" doit inciter à l'achat avec le CTA spécifié.
7. Utilise le format Markdown pour la mise en forme:
   - Titres: # Titre principal, ## Sous-titre, ### Sous-sous-titre
   - Gras: **texte en gras**
   - Italique: *texte en italique*
   - Listes: - élément de liste
   - Liens: [texte du lien](URL)
8. Respecte la longueur cible de ${data.wordCount || 200} mots.
9. Intègre naturellement le mot-clé principal et les variations sémantiques.
10. Évite absolument d'utiliser les mots interdits.
11. IMPORTANT: La description doit être rédigée UNIQUEMENT et ENTIÈREMENT en ${data.language || 'français'}.
12. N'utilise AUCUN mot ou expression d'une autre langue, même pour les citations ou exemples.
13. Si tu dois mentionner des termes techniques ou des noms propres qui n'existent pas dans la langue cible, utilise la version la plus proche dans cette langue.

Génère uniquement la description en Markdown, sans commentaires ni explications supplémentaires.
`;

    // Système prompt pour OpenAI
    const systemPrompt = `Tu es un expert en copywriting et marketing qui crée des descriptions de produits persuasives au format AIDA. Tu utilises le format Markdown pour structurer tes textes. 
        
Tu dois rédiger UNIQUEMENT et ENTIÈREMENT en ${data.language || 'français'}, pas dans une autre langue. 

Assure-toi que tout le contenu généré est dans cette langue.

N'utilise AUCUN mot ou expression d'une autre langue, même pour les citations ou exemples.

Si tu dois mentionner des termes techniques ou des noms propres qui n'existent pas dans la langue cible, utilise la version la plus proche dans cette langue.`;

    // Générer la description avec retry et vérification de langue
    const generatedContent = await generateProductDescriptionWithRetry(
      prompt, 
      systemPrompt, 
      data.language || 'fr'
    );

    // Mettre à jour les statistiques de génération
    console.log(`API /generate-product-description: Mise à jour des statistiques de génération`);
    console.log(`API /generate-product-description: Début updateStatsAfterGeneration pour ${data.memberId}, coût: ${tokenCost}`);
    
    await updateStatsAfterGeneration(data.memberId, tokenCost, true);
    
    // Attendre un court délai pour s'assurer que les changements sont propagés
    console.log('API /generate-product-description: Attente pour propager les modifications d\'état...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Récupérer les statistiques mises à jour
    console.log(`API /generate-product-description: Récupération des statistiques mises à jour pour ${data.memberId}`);
    const updatedStats = await fetchGenerationStats(data.memberId);
    console.log(`API /generate-product-description: Statistiques mises à jour, nouveau solde: ${updatedStats.tokenBalance}`);

    // Retourner la réponse
    return NextResponse.json({ 
      content: generatedContent,
      status: 'success',
      tokenCost,
      newBalance: updatedStats.tokenBalance
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération de la description:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de la description' },
      { status: 500 }
    );
  }
} 