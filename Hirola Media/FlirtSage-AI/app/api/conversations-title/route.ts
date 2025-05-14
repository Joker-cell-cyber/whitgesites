import { NextRequest, NextResponse } from 'next/server';
import { getUserAuth } from '@/app/lib/auth-service';
import { getConversation, updateConversationTitle } from '@/app/lib/conversation-service';

export async function PUT(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = await getUserAuth();
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { conversationId, title } = data;

    if (!conversationId || !title) {
      return NextResponse.json(
        { error: 'ID de conversation et titre requis' },
        { status: 400 }
      );
    }

    // Vérifier que la conversation existe
    const conversation = await getConversation(auth.userId, conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation introuvable' },
        { status: 404 }
      );
    }

    // Mettre à jour le titre
    const updatedConversation = await updateConversationTitle(
      auth.userId,
      conversationId,
      title
    );

    return NextResponse.json({
      conversation: updatedConversation
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du titre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du titre' },
      { status: 500 }
    );
  }
} 