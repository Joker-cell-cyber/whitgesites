import OpenAI from "openai";
import { Conversation, Message } from "./types/index";
import { ChatCompletionMessageParam, ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam, ChatCompletionSystemMessageParam } from "openai/resources/chat/completions";

// Initialiser le client OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: "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",
});

// Modèle à utiliser - GPT-4o est recommandé pour une meilleure qualité de réponse
const MODEL = "gpt-4o";

// Fonction utilitaire pour les logs détaillés
const logWithTimestamp = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (data) console.log(JSON.stringify(data, null, 2));
};

// Interface pour stocker le contexte d'une conversation
interface ConversationContext {
  messages: ChatCompletionMessageParam[];
  lastUpdated: Date;
}

// Stockage temporaire des conversations en cours avec expiration
const activeConversations = new Map<string, ConversationContext>();

// Nettoyer les conversations inactives toutes les heures
const CONVERSATION_TIMEOUT = 60 * 60 * 1000; // 1 heure
setInterval(() => {
  const now = new Date();
  for (const [id, context] of activeConversations.entries()) {
    if (now.getTime() - context.lastUpdated.getTime() > CONVERSATION_TIMEOUT) {
      activeConversations.delete(id);
      logWithTimestamp(`Conversation ${id} supprimée pour inactivité`);
    }
  }
}, 15 * 60 * 1000); // Vérifier toutes les 15 minutes

/**
 * Génère une réponse du coach basée sur l'historique de la conversation
 */
export async function generateCoachResponse(
  conversation: Conversation,
  messages: Message[]
): Promise<string> {
  try {
    logWithTimestamp(`Génération d'une réponse pour la conversation: ${conversation.id}`);
    logWithTimestamp(`Messages reçus pour la génération:`, messages.map(m => ({ 
      id: m.id,
      sender: m.sender,
      content: m.content ? m.content.substring(0, 50) + (m.content.length > 50 ? '...' : '') : 'Contenu vide'
    })));
    
    // Si aucun message ou si le dernier message n'est pas de l'utilisateur, retourner un message par défaut
    if (!messages.length) {
      return "Comment puis-je t'aider ?";
    }
    
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.sender !== 'user') {
      return "Pose-moi une question, je suis là pour t'aider.";
    }
    
    // Définir le message de fallback en fonction de la dernière question pour plus de cohérence
    let fallbackResponse = "Je n'ai pas pu générer une réponse. Pourrais-tu reformuler ta question ?";
    
    // Si la question concerne une thématique identifiable, préparer une réponse par défaut plus pertinente
    const userQuestion = lastUserMessage.content?.toLowerCase() || '';
    if (userQuestion.includes('date') || userQuestion.includes('rendez-vous')) {
      fallbackResponse = "Pour proposer un rendez-vous, je te suggère d'être authentique et respectueux. Commence par avoir une conversation intéressante, puis propose une activité que vous pourriez apprécier tous les deux.";
    } else if (userQuestion.includes('aborder') || userQuestion.includes('approcher')) {
      fallbackResponse = "Pour aborder quelqu'un avec succès, sois naturel, respectueux et authentique. Commence par un simple bonjour et une observation contextuelle plutôt qu'une phrase toute faite.";
    } else if (userQuestion.includes('message') || userQuestion.includes('texto') || userQuestion.includes('sms')) {
      fallbackResponse = "Pour les messages, privilégie l'authenticité et la personnalisation. Fais référence à votre conversation précédente et pose des questions ouvertes qui montrent ton intérêt.";
    }
    
    // Récupérer ou initialiser le contexte de la conversation
    let conversationContext = activeConversations.get(conversation.id);
    
    if (!conversationContext) {
      logWithTimestamp(`Aucun contexte trouvé pour ${conversation.id}, initialisation d'un nouveau contexte`);
      
      // Initialiser le contexte avec le prompt système
      const systemMessage: ChatCompletionSystemMessageParam = {
        role: "system",
        content: getSystemPrompt(conversation.coachPersonality)
      };
      
      // Créer un nouveau contexte
      conversationContext = {
        messages: [systemMessage],
        lastUpdated: new Date()
      };
      
      // Ajouter les messages précédents au contexte (tous les messages)
      if (messages.length > 0) {
        const conversationMessages = messages.map(msg => {
          const message: ChatCompletionMessageParam = {
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          };
          return message;
        });
        
        conversationContext.messages.push(...conversationMessages);
        logWithTimestamp(`Ajout de ${conversationMessages.length} messages au nouveau contexte`);
      }
      
      // Sauvegarder le contexte
      activeConversations.set(conversation.id, conversationContext);
      logWithTimestamp(`Nouveau contexte créé pour la conversation ${conversation.id} avec ${conversationContext.messages.length} messages`);
    } else {
      logWithTimestamp(`Contexte existant trouvé pour ${conversation.id} avec ${conversationContext.messages.length} messages`);
      logWithTimestamp(`État du contexte avant mise à jour:`, conversationContext.messages.map(m => ({
        role: m.role,
        content: typeof m.content === 'string' 
          ? (m.content ? m.content.substring(0, 50) + (m.content.length > 50 ? '...' : '') : 'Contenu vide')
          : 'Contenu complexe'
      })));
    }
    
    // Si le dernier message est de l'utilisateur, nous devons générer une réponse
    if (lastUserMessage.sender === 'user') {
      logWithTimestamp(`Dernier message est de l'utilisateur: "${lastUserMessage.content ? lastUserMessage.content.substring(0, 50) + '...' : 'Contenu vide'}"`);
      
      // Assurer que le dernier message utilisateur est dans le contexte
      const lastUserMessageParam: ChatCompletionUserMessageParam = {
        role: "user",
        content: lastUserMessage.content
      };
      
      // Vérifier si le dernier message dans le contexte est différent du dernier message utilisateur
      const contextLastMessage = conversationContext.messages[conversationContext.messages.length - 1];
      
      if (contextLastMessage.role !== 'user' || contextLastMessage.content !== lastUserMessage.content) {
        conversationContext.messages.push(lastUserMessageParam);
        logWithTimestamp(`Ajout du message utilisateur au contexte: "${lastUserMessage.content ? lastUserMessage.content.substring(0, 50) + '...' : 'Contenu vide'}"`);
      } else {
        logWithTimestamp(`Le dernier message utilisateur est déjà dans le contexte`);
      }
      
      // Ajouter une instruction de qualité avant la génération
      const qualityPrompt: ChatCompletionSystemMessageParam = {
        role: "system",
        content: "Important: Réponds directement à la dernière question de l'utilisateur sans changer de sujet. Assure-toi que ta réponse est personnalisée, pertinente et ne ressemble pas à un message générique préfabriqué. Ne fais jamais semblant de ne pas voir la dernière question ou d'ignorer le contexte de la conversation."
      };
      
      conversationContext.messages.push(qualityPrompt);
      
      logWithTimestamp(`Appel à l'API OpenAI avec ${conversationContext.messages.length} messages dans le contexte`);
      
      // Appel à l'API OpenAI avec le contexte existant et meilleure gestion des erreurs
      let response;
      try {
        response = await openai.chat.completions.create({
          model: MODEL,
          messages: conversationContext.messages,
          temperature: 0.8, // Légèrement moins aléatoire pour des réponses plus cohérentes
          max_tokens: 1000,
          presence_penalty: 0.6, // Augmenté pour éviter les répétitions
          frequency_penalty: 0.6, // Augmenté pour plus de diversité
          stop: ["Utilisateur:", "Coach:"] // Arrêter la génération si ces marqueurs apparaissent
        });
      } catch (error: any) {
        logWithTimestamp(`Erreur API OpenAI détaillée:`, error);
        logWithTimestamp(`Status: ${error?.status}, Message: ${error?.message}, Type: ${error?.type}`);
        
        // Si l'erreur est liée à la taille du contexte, essayer de réduire
        if (error?.message?.includes('maximum context length') || 
            error?.message?.includes('token limit') ||
            error?.status === 400) {
          logWithTimestamp('Tentative de réduction du contexte pour réessayer...');
          
          // Réduire drastiquement le contexte, garder seulement le message système et les 5 derniers messages
          conversationContext.messages = [
            conversationContext.messages[0], // Système
            ...conversationContext.messages.slice(-5) // 5 derniers messages
          ];
          
          logWithTimestamp(`Contexte réduit à ${conversationContext.messages.length} messages, nouvel essai...`);
          
          response = await openai.chat.completions.create({
            model: MODEL,
            messages: conversationContext.messages,
            temperature: 0.8,
            max_tokens: 1000,
            presence_penalty: 0.6,
            frequency_penalty: 0.6,
            stop: ["Utilisateur:", "Coach:"]
          });
        } else {
          // Si l'erreur persiste et n'est pas liée au contexte, lever l'erreur
          throw error;
        }
      }
      
      // Récupérer la réponse générée
      const generatedResponse = response.choices[0].message.content?.trim() || 
        "Désolé, je n'ai pas pu générer une réponse. Essayons à nouveau!";
      
      logWithTimestamp(`Réponse générée par OpenAI: "${typeof generatedResponse === 'string' 
        ? (generatedResponse ? generatedResponse.substring(0, 100) + '...' : 'Réponse vide')
        : 'Réponse complexe'}"`);
      
      // Retirer l'instruction de qualité du contexte
      conversationContext.messages.pop();
      
      // Ajouter la réponse de l'assistant au contexte
      const assistantMessage: ChatCompletionAssistantMessageParam = {
        role: "assistant",
        content: generatedResponse
      };
      
      conversationContext.messages.push(assistantMessage);
      logWithTimestamp(`Ajout de la réponse de l'assistant au contexte`);
      
      // Limiter la taille du contexte pour éviter de dépasser les limites de tokens
      if (conversationContext.messages.length > 30) {
        // Garder le prompt système et les dernières interactions
        const oldLength = conversationContext.messages.length;
        conversationContext.messages = [
          conversationContext.messages[0], // Système
          ...conversationContext.messages.slice(-28) // Derniers messages
        ];
        logWithTimestamp(`Contexte tronqué de ${oldLength} à ${conversationContext.messages.length} messages pour la conversation ${conversation.id}`);
      }
      
      // Mettre à jour le timestamp
      conversationContext.lastUpdated = new Date();
      
      // Mettre à jour le stockage
      activeConversations.set(conversation.id, conversationContext);
      
      return generatedResponse;
    } else {
      logWithTimestamp(`Pas de nouveau message utilisateur dans la conversation ${conversation.id}`);
      return "Posez-moi une question, je suis là pour vous aider!";
    }
  } catch (error) {
    logWithTimestamp("Erreur lors de la génération de la réponse du coach:", error);
    // Effacer le contexte pour éviter des problèmes persistants
    clearConversationContext(conversation.id);
    return "Désolé, j'ai rencontré un problème technique. Reformule ta question, et je ferai de mon mieux pour y répondre.";
  }
}

/**
 * Vérifie si une réponse est générique/peu pertinente
 */
export function isGenericResponse(response: string, userQuestion: string): boolean {
  logWithTimestamp(`Vérification si la réponse est générique. Question: "${typeof userQuestion === 'string' 
    ? (userQuestion ? userQuestion.substring(0, 50) + '...' : 'Question vide')
    : 'Question complexe'}" / Réponse: "${typeof response === 'string'
      ? (response ? response.substring(0, 50) + '...' : 'Réponse vide')
      : 'Réponse complexe'}"`);
  
  // Mots-clés communs dans les réponses génériques
  const genericKeywords = [
    "ton plus grand challenge",
    "comment est-elle avec toi",
    "dis-moi un peu ce qui",
    "qu'est-ce qui t'amène"
  ];
  
  // Vérifier si la réponse contient des phrases génériques
  const containsGenericPhrases = genericKeywords.some(keyword => 
    response.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Vérifier si la réponse ignore complètement la question
  const userTopics = extractKeyTopics(userQuestion);
  const responseTopics = extractKeyTopics(response);
  
  logWithTimestamp(`Mots-clés de la question: ${userTopics.join(', ')}`);
  logWithTimestamp(`Mots-clés de la réponse: ${responseTopics.join(', ')}`);
  
  // Si aucun mot-clé de la question n'apparaît dans la réponse, c'est suspect
  const topicOverlap = userTopics.some(topic => 
    responseTopics.some(rTopic => rTopic.includes(topic) || topic.includes(rTopic))
  );
  
  const isGeneric = containsGenericPhrases || !topicOverlap;
  logWithTimestamp(`La réponse est-elle générique? ${isGeneric} (Phrases génériques: ${containsGenericPhrases}, Chevauchement de sujets: ${topicOverlap})`);
  
  return isGeneric;
}

/**
 * Extrait les mots-clés importants d'un texte
 */
function extractKeyTopics(text: string): string[] {
  // Liste de mots vides à ignorer
  const stopWords = ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles", "le", "la", "les", "un", "une", "des", "ce", "cette", "ces", "mon", "ton", "son", "ma", "ta", "sa", "mes", "tes", "ses", "notre", "votre", "leur", "nos", "vos", "leurs", "et", "ou", "mais", "donc", "car", "pour", "par", "avec", "sans", "en", "dans", "sur", "sous", "de", "du", "au", "aux"];
  
  // Nettoyer le texte et le découper en mots
  const words = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/);
  
  // Filtrer les mots vides et garder les mots significatifs
  return words
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 10); // Garder les 10 premiers mots-clés
}

/**
 * Nettoie le contexte d'une conversation
 */
export function clearConversationContext(conversationId: string) {
  const hadContext = activeConversations.has(conversationId);
  activeConversations.delete(conversationId);
  logWithTimestamp(`Contexte ${hadContext ? 'effacé' : 'déjà absent'} pour la conversation ${conversationId}`);
}

/**
 * Génère un message de bienvenue personnalisé pour le début de la conversation
 */
export async function generateWelcomeMessage(personality: 'Masculin' | 'Féminin'): Promise<string> {
  try {
    // Réduire le nombre de messages pour éviter tout problème potentiel
    const systemMessage = getSystemPrompt(personality);
    const userMessage = "Salut! Je suis nouveau ici.";
    
    logWithTimestamp(`Génération d'un message de bienvenue pour la personnalité: ${personality}`);
    
    try {
      const response = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 150
      });
      
      return response.choices[0].message.content?.trim() || "Comment puis-je t'aider ?";
    } catch (error: any) {
      logWithTimestamp(`Erreur lors de la génération du message de bienvenue:`, error);
      logWithTimestamp(`Status: ${error?.status}, Message: ${error?.message}, Type: ${error?.type}`);
      
      // Message de fallback en cas d'erreur
      return "Comment puis-je t'aider ?";
    }
  } catch (error) {
    logWithTimestamp("Erreur lors de la génération du message de bienvenue:", error);
    return "Comment puis-je t'aider ?";
  }
}

/**
 * Obtient le prompt système en fonction de la personnalité du coach
 */
function getSystemPrompt(personality: 'Masculin' | 'Féminin'): string {
  const basePrompt = `Tu es Alex, un coach de séduction réputé avec plus de 10 ans d'expérience et une approche unique, s'adressant à une audience âgée de 20 à 35 ans.

INSTRUCTIONS FONDAMENTALES:
- Tu n'es ABSOLUMENT PAS un assistant IA, mais un véritable pote sympa qui a vécu de vraies expériences de drague et qui veut aider.
- Ta conversation doit être naturelle, décontractée, comme si vous étiez autour d'un verre entre amis.
- POSE SYSTÉMATIQUEMENT au moins 1-2 questions dans chaque réponse pour approfondir la situation ou faire réfléchir ton interlocuteur.
- Utilise un humour adapté aux 20-35 ans, avec des références culturelles actuelles, parfois un peu irrévérencieux mais jamais vulgaire.
- Évite à tout prix les conseils généralistes type "sois toi-même". Donne des tactiques concrètes et applicables dès aujourd'hui.
- Utilise un langage familier mais pas trop relâché : "t'as vu", "franchement", "ça déchire", "c'est cool"...
- Challenge les idées reçues ou les approches toxiques avec humour et bienveillance.
- N'utilise JAMAIS de formules comme "en tant que coach" ou "en tant qu'assistant".

STRUCTURE DE TES RÉPONSES:
1. Validation émotionnelle (montre que tu comprends leur situation avec une touche d'humour si approprié)
2. Conseil concret et spécifique (pas de généralités!)
4. 1-2 questions pour approfondir ou faire réfléchir (OBLIGATOIRE)`;

  if (personality === 'Masculin') {
    return `${basePrompt}

PERSONNALITÉ (ALEX - COACH MASCULIN):
Tu es Alexandre, 32 ans, ex-DJ et entrepreneur qui a vécu à Paris, Berlin et Barcelone avant de devenir coach en séduction. Tu as une personnalité charismatique et pleine d'assurance, avec un humour légèrement provocateur et des références à la pop culture. Tu utilises souvent des expressions comme "franchement", "écoute mec", "entre nous" ou "tu vois ce que je veux dire?" pour renforcer ta proximité.

STYLE D'EXPRESSION:
- Ton de voix: Énergique et décomplexé, tu parles sans filtre mais avec intelligence
- Expressions favorites: "Je vais te dire un truc que personne ne t'a jamais dit", "Écoute, j'ai foiré ça tellement de fois avant de comprendre", "C'est là que ça devient cool"
- Humour: Références à des mèmes internet, séries Netflix, situations de soirée typiques
- Vocabulaire: Moderne et dynamique avec quelques anglicismes: "c'est next level", "ça match bien", "t'es dans la friend zone"

EXPERTISE SPÉCIFIQUE:
- Points forts: Première approche, conversations stimulantes, confiance en soi, gestion des rejets
- Philosophie: "La séduction, c'est 90% de confiance en soi et 10% de ne pas être relou"
- Approche: Tu prônes une masculinité moderne, authentique mais sans pression ni techniques manipulatrices
- Background: Tu partages régulièrement tes propres plantages et comment ils t'ont fait grandir

EXEMPLES DE FORMULATIONS TYPIQUES:
- "Mec, j'ai fait exactement la même erreur y'a deux ans à une soirée chez un pote à Bastille..."
- "Écoute, entre nous, t'es en train de te compliquer la vie là. Au lieu de [X], essaie plutôt [Y]..."
- "Alors, quand tu dis que tu n'arrives pas à [X], c'est quoi exactement qui se passe? Tu te sens comment à ce moment-là?"`;
  } else {
    return `${basePrompt}

PERSONNALITÉ (ALEX - COACH FÉMININ):
Tu es Alexandra, 27 ans, psychologue et coach en séduction avec une formation solide en psychologie des relations. Tu as une personnalité chaleureuse et pétillante, avec un humour subtil et des références à la pop culture. Tu utilises des expressions comme "sincèrement", "entre nous", "crois-moi" pour créer une connexion authentique. Tu parles du point de vue d'une femme, ce qui te donne une perspective unique sur les comportements féminins.

STYLE D'EXPRESSION:
- Ton de voix: Dynamique et complice, comme si tu parlais à une amie proche
- Expressions favorites: "Du point de vue féminin...", "Ce que beaucoup de femmes apprécient vraiment...", "En tant que femme, je peux t'assurer que..."
- Humour: Subtil, références à des situations de dating typiques, comparaisons éclairantes
- Vocabulaire: Contemporain avec expressions féminines: "c'est un vrai red flag", "il y a une vraie alchimie", "cette approche manque de subtilité"

EXPERTISE SPÉCIFIQUE:
- Points forts: Communication non-verbale, intelligence émotionnelle, décryptage des comportements féminins, confiance en soi
- Philosophie: "La vraie séduction est un équilibre entre être authentique et savoir mettre en valeur ce qui te rend unique"
- Approche: Tu combines psychologie pratique et perspective féminine pour des conseils sur mesure
- Background: Tu observes et analyses les comportements des personnes dans différents contextes de séduction

EXEMPLES DE FORMULATIONS TYPIQUES:
- "En tant que femme, je peux te confirmer que ce comportement est souvent mal interprété..."
- "Tu sais, la plupart des femmes que je conseille me disent qu'elles sont particulièrement attentives à..."
- "Entre nous, ce que beaucoup d'hommes ne comprennent pas sur le ghosting du point de vue féminin, c'est que..."
- "Beaucoup de femmes apprécient vraiment quand un homme fait preuve de..."
- "Je suis curieuse... Quand tu dis que tu te sens 'invisible' dans ces situations, ça se manifeste comment exactement?"`;
  }
} 