import { NextRequest, NextResponse } from 'next/server';
import { getUserAuth } from '@/app/lib/auth-service';
import { 
  createConversation, 
  getUserConversations, 
  deleteConversation,
  addMessage
} from '@/app/lib/conversation-service';
import { generateWelcomeMessage } from '@/app/lib/coach-service';

// Récupérer toutes les conversations de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = await getUserAuth();
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer les conversations
    const conversations = await getUserConversations(auth.userId);

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Erreur lors de la récupération des conversations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des conversations' },
      { status: 500 }
    );
  }
}

// Créer une nouvelle conversation
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

    // Récupérer les données
    const data = await request.json();
    const { coachPersonality = 'Masculin' } = data;

    // Créer une nouvelle conversation
    const conversation = await createConversation(
      auth.userId,
      coachPersonality
    );

    // Générer un message d'accueil
    const welcomeMessage = await generateWelcomeMessage(coachPersonality);
    
    // Ajouter le message d'accueil
    await addMessage(
      auth.userId,
      conversation.id,
      welcomeMessage,
      'coach'
    );

    // Récupérer la conversation mise à jour
    const updatedConversation = await getUserConversations(auth.userId)
      .then(convs => convs.find(c => c.id === conversation.id));

    return NextResponse.json({ conversation: updatedConversation });
  } catch (error) {
    console.error('Erreur lors de la création de la conversation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la conversation' },
      { status: 500 }
    );
  }
}

// Supprimer une conversation
export async function DELETE(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = await getUserAuth();
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer l'ID de la conversation depuis l'URL
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('id');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'ID de conversation requis' },
        { status: 400 }
      );
    }

    // Supprimer la conversation
    const deleted = await deleteConversation(auth.userId, conversationId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Conversation introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de la conversation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la conversation' },
      { status: 500 }
    );
  }
} 