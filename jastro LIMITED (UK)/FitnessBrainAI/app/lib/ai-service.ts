/**
 * Service d'intelligence artificielle
 * 
 * Ce service gère les interactions avec l'API OpenAI pour générer du contenu.
 */

import OpenAI from 'openai';

// Initialiser le client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Génère un article de blog
 * @param prompt Sujet de l'article
 * @param tone Ton de l'article
 * @param length Longueur de l'article
 * @returns Contenu de l'article généré
 */
export async function generateArticle(prompt: string, tone: string, length: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Tu es un rédacteur professionnel. Écris un article de blog ${length} sur le sujet donné avec un ton ${tone}. Utilise le format Markdown avec des titres, sous-titres, listes et paragraphes bien structurés.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: getMaxTokensForLength(length),
    });

    return completion.choices[0].message.content || "Désolé, je n'ai pas pu générer d'article.";
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    throw new Error('Erreur lors de la génération de l\'article');
  }
}

/**
 * Génère une description de produit
 * @param productName Nom du produit
 * @param productType Type de produit
 * @param keyFeatures Caractéristiques clés
 * @param targetAudience Public cible
 * @param tone Ton de la description
 * @returns Description du produit générée
 */
export async function generateProductDescription(
  productName: string,
  productType: string,
  keyFeatures: string,
  targetAudience: string,
  tone: string
) {
  try {
    const prompt = `
      Nom du produit: ${productName}
      Type de produit: ${productType}
      Caractéristiques clés: ${keyFeatures}
      Public cible: ${targetAudience}
      Ton: ${tone}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en marketing. Crée une description de produit convaincante et persuasive pour le produit décrit. Utilise un ton ${tone} et cible spécifiquement l'audience mentionnée. Mets en valeur les caractéristiques clés du produit.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || "Désolé, je n'ai pas pu générer de description.";
  } catch (error) {
    console.error('Erreur lors de la génération de la description:', error);
    throw new Error('Erreur lors de la génération de la description');
  }
}

/**
 * Détermine le nombre maximum de tokens en fonction de la longueur demandée
 * @param length Longueur demandée (court, moyen, long)
 * @returns Nombre maximum de tokens
 */
function getMaxTokensForLength(length: string): number {
  switch (length.toLowerCase()) {
    case 'court':
      return 500;
    case 'moyen':
      return 1000;
    case 'long':
      return 1500;
    default:
      return 1000;
  }
} 