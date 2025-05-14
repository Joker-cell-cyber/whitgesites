import { NextRequest, NextResponse } from 'next/server';
import { getUserAuth } from '@/app/lib/auth-service';
import { getConversation, updateCoachPersonality } from '@/app/lib/conversation-service';

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

    // Récupérer les données
    const data = await request.json();
    const { conversationId, coachPersonality } = data;
    
    if (!conversationId) {
      return NextResponse.json(
        { error: 'ID de conversation requis' },
        { status: 400 }
      );
    }

    if (!coachPersonality || !['Masculin', 'Féminin'].includes(coachPersonality)) {
      return NextResponse.json(
        { error: 'Personnalité invalide' },
        { status: 400 }
      );
    }
    
    // Vérifier si la conversation existe et appartient à l'utilisateur
    const conversation = await getConversation(auth.userId, conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation introuvable' },
        { status: 404 }
      );
    }

    // Mettre à jour la personnalité
    const updatedConversation = await updateCoachPersonality(
      auth.userId,
      conversationId,
      coachPersonality as 'Masculin' | 'Féminin'
    );

    return NextResponse.json({ conversation: updatedConversation });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la personnalité:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la personnalité' },
      { status: 500 }
    );
  }
} 