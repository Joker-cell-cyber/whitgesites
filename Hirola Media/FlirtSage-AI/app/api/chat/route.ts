import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getUserAuth, getUserProfile } from '@/app/lib/auth-service';
import { addMessage, getConversation, hasEnoughTokens } from '@/app/lib/conversation-service';
import { generateCoachResponse } from '@/app/lib/coach-service';
import { TOKEN_COST_MESSAGE } from '@/app/lib/constants';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = await getUserAuth();
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer les données du message
    const data = await request.json();
    const { conversationId, message } = data;

    if (!conversationId || !message) {
      return NextResponse.json(
        { error: 'ID de conversation et message requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur a assez de tokens
    const userProfile = await getUserProfile(auth.userId);
    if (!userProfile || !userProfile.tokenBalance || userProfile.tokenBalance < TOKEN_COST_MESSAGE) {
      return NextResponse.json(
        { error: 'Solde de tokens insuffisant' },
        { status: 402 }
      );
    }

    // Récupérer la conversation
    const conversation = await getConversation(auth.userId, conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation introuvable' },
        { status: 404 }
      );
    }

    // Ajouter le message de l'utilisateur
    const userMessage = await addMessage(
      auth.userId,
      conversationId,
      message,
      'user',
      TOKEN_COST_MESSAGE
    );

    // Générer la réponse du coach
    const coachResponse = await generateCoachResponse(
      conversation,
      conversation.messages
    );

    // Ajouter la réponse du coach
    const coachMessage = await addMessage(
      auth.userId,
      conversationId,
      coachResponse,
      'coach'
    );

    return NextResponse.json({
      userMessage,
      coachMessage
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 