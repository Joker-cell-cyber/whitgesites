import { NextRequest, NextResponse } from 'next/server';
import { getUserAuth } from '@/app/lib/auth-service';
import { addMessage, getConversation, hasEnoughTokens } from '@/app/lib/conversation-service';
import { generateCoachResponse, clearConversationContext, isGenericResponse } from '@/app/lib/coach-service';
import { TOKEN_COST_MESSAGE } from '@/app/lib/constants';

// Fonction utilitaire pour les logs détaillés
const logWithTimestamp = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[API][${timestamp}] ${message}`);
  if (data) console.log(JSON.stringify(data, null, 2));
};

// GET pour récupérer les messages d'une conversation
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = await getUserAuth();
    if (!auth || !auth.isAuthenticated) {
      logWithTimestamp("GET /api/messages - Requête non autorisée");
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer l'ID de conversation de la requête URL
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    logWithTimestamp(`GET /api/messages - Récupération des messages pour conversationId: ${conversationId}`);

    if (!conversationId) {
      logWithTimestamp("GET /api/messages - ID de conversation manquant");
      return NextResponse.json(
        { error: 'ID de conversation requis' },
        { status: 400 }
      );
    }

    // Récupérer la conversation avec ses messages
    const conversation = await getConversation(auth.userId, conversationId);
    
    if (!conversation) {
      logWithTimestamp(`GET /api/messages - Conversation ${conversationId} introuvable`);
      return NextResponse.json(
        { error: 'Conversation introuvable' },
        { status: 404 }
      );
    }

    logWithTimestamp(`GET /api/messages - ${conversation.messages?.length || 0} messages trouvés pour la conversation ${conversationId}`);

    // Renvoyer les messages de la conversation
    return NextResponse.json({
      messages: conversation.messages || []
    });

  } catch (error) {
    logWithTimestamp("GET /api/messages - Erreur:", error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

// POST pour envoyer un nouveau message
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = await getUserAuth();
    if (!auth || !auth.isAuthenticated) {
      logWithTimestamp("POST /api/messages - Requête non autorisée");
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer les données du message
    const data = await request.json();
    const { conversationId, content, sender } = data;

    logWithTimestamp(`POST /api/messages - Nouveau message pour conversationId: ${conversationId}`, {
      content: content ? content.substring(0, 100) + (content.length > 100 ? '...' : '') : 'Contenu vide',
      sender
    });

    if (!conversationId || !content) {
      logWithTimestamp("POST /api/messages - Données requises manquantes");
      return NextResponse.json(
        { error: 'ID de conversation et contenu du message requis' },
        { status: 400 }
      );
    }

    // Récupérer la conversation
    const conversation = await getConversation(auth.userId, conversationId);
    if (!conversation) {
      logWithTimestamp(`POST /api/messages - Conversation ${conversationId} introuvable`);
      return NextResponse.json(
        { error: 'Conversation introuvable' },
        { status: 404 }
      );
    }

    // Ajouter le message de l'utilisateur
    const userMessage = await addMessage(
      auth.userId,
      conversationId,
      content,
      'user',
      TOKEN_COST_MESSAGE
    );

    logWithTimestamp(`POST /api/messages - Message utilisateur ajouté:`, {
      id: userMessage.id,
      content: userMessage.content ? userMessage.content.substring(0, 50) + (userMessage.content.length > 50 ? '...' : '') : 'Contenu vide'
    });

    // Variable pour suivre le nombre de tentatives
    let attempts = 0;
    const MAX_ATTEMPTS = 2;
    
    // Générer la réponse du coach avec plusieurs tentatives si nécessaire
    let coachResponse: string;
    
    try {
      // Définir un timeout pour la requête à OpenAI (45 secondes)
      const generateWithRetry = async (): Promise<string> => {
        attempts++;
        logWithTimestamp(`POST /api/messages - Tentative ${attempts}/${MAX_ATTEMPTS} de générer une réponse pour la conversation ${conversationId}`);
        
        try {
          // Utiliser une promesse avec un timeout
          const timeoutPromise = new Promise<string>((_, reject) => {
            setTimeout(() => {
              reject(new Error('La génération de réponse a pris trop de temps.'));
            }, 45000); // 45 secondes
          });

          // Récupérer la conversation mise à jour avec le nouveau message utilisateur
          const updatedConversation = await getConversation(auth.userId, conversationId);
          logWithTimestamp(`POST /api/messages - Récupération de la conversation mise à jour avec ${updatedConversation?.messages?.length || 0} messages`);

          // Générer la réponse du coach avec timeout
          const response = await Promise.race([
            generateCoachResponse(conversation, updatedConversation?.messages || []),
            timeoutPromise
          ]);
          
          logWithTimestamp(`POST /api/messages - Réponse générée: "${response ? response.substring(0, 100) + '...' : 'Réponse vide'}"`);
          
          // Vérifier si la réponse est générique ou hors sujet
          if (isGenericResponse(response, content)) {
            logWithTimestamp(`POST /api/messages - Réponse générique détectée pour la conversation ${conversationId}, nouvelle tentative...`);
            
            // Nettoyer le contexte pour forcer une régénération complète
            if (attempts < MAX_ATTEMPTS) {
              clearConversationContext(conversationId);
              return await generateWithRetry();
            } else {
              logWithTimestamp(`POST /api/messages - Nombre maximum de tentatives atteint pour la conversation ${conversationId}`);
              return response;
            }
          }
          
          return response;
        } catch (error) {
          logWithTimestamp(`POST /api/messages - Échec de la tentative ${attempts}:`, error);
          if (attempts < MAX_ATTEMPTS) {
            logWithTimestamp(`POST /api/messages - Nouvelle tentative pour la conversation ${conversationId}`);
            // Attendre un court instant avant de réessayer
            await new Promise(resolve => setTimeout(resolve, 1000));
            return await generateWithRetry();
          } else {
            throw error;
          }
        }
      };
      
      coachResponse = await generateWithRetry();
      
    } catch (error) {
      logWithTimestamp('POST /api/messages - Erreur ou timeout lors de la génération de la réponse:', error);
      
      // Message de fallback contextuel en cas de timeout ou d'erreur
      // Plus personnalisé selon le contenu du message utilisateur
      const userContentKeywords = content.toLowerCase();
      let fallbackMessage = `Je suis désolé, j'ai rencontré un petit problème technique... 😅\n\n`;
      
      if (userContentKeywords.includes('femme') || userContentKeywords.includes('fille') || userContentKeywords.includes('relations')) {
        fallbackMessage += `Ta question sur les relations semble intéressante ! Peux-tu reformuler en étant plus spécifique sur ce que tu aimerais savoir concernant cette situation ? \n\n`;
      } else if (userContentKeywords.includes('date') || userContentKeywords.includes('rendez-vous') || userContentKeywords.includes('sortie')) {
        fallbackMessage += `Je vois que tu cherches des conseils pour un rendez-vous. Peux-tu me donner plus de détails sur ce que tu as déjà prévu ou ce que tu aimerais faire ?\n\n`;
      } else if (userContentKeywords.includes('message') || userContentKeywords.includes('texte') || userContentKeywords.includes('répondre')) {
        fallbackMessage += `Ta question sur la communication semble intéressante ! Peux-tu me donner un exemple concret de la situation ou du message auquel tu fais référence ?\n\n`;
      } else {
        fallbackMessage += `Pour mieux t'aider avec ta demande, peux-tu reformuler ta question de manière plus concise ou me donner plus de contexte ?\n\n`;
      }
      
      fallbackMessage += `Je suis là pour t'aider avec des conseils personnalisés, mais parfois j'ai besoin d'un peu plus de précisions pour te donner la meilleure réponse possible.`;
      
      coachResponse = fallbackMessage;
      logWithTimestamp('POST /api/messages - Utilisation du message de fallback');

      // Nettoyer le contexte de la conversation en cas d'erreur
      clearConversationContext(conversationId);
    }

    // Ajouter la réponse du coach
    const coachMessage = await addMessage(
      auth.userId,
      conversationId,
      coachResponse,
      'coach'
    );

    logWithTimestamp(`POST /api/messages - Message coach ajouté:`, {
      id: coachMessage.id,
      content: coachMessage.content ? coachMessage.content.substring(0, 50) + (coachMessage.content.length > 50 ? '...' : '') : 'Contenu vide'
    });

    // Récupérer la conversation mise à jour
    const updatedConversation = await getConversation(auth.userId, conversationId);
    
    logWithTimestamp(`POST /api/messages - Réponse envoyée avec ${updatedConversation?.messages?.length || 0} messages au total`);
    
    return NextResponse.json({
      messages: updatedConversation?.messages || [],
      userMessage,
      coachMessage
    });
    
  } catch (error) {
    logWithTimestamp('POST /api/messages - Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 