import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { generateFitnessArticle } from '@/app/lib/coach-service';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || 'test123';
    
    // Extraire les données du corps de la requête
    const body = await request.json();
    const { title, category, keywords, wordCount } = body;
    
    // Valider les données d'entrée
    if (!title || !category) {
      return NextResponse.json({ error: 'Données incomplètes' }, { status: 400 });
    }
    
    // Générer l'article
    const article = await generateFitnessArticle(
      userId,
      title,
      category,
      keywords || [],
      wordCount || 800
    );
    
    return NextResponse.json({ success: true, article });
    
  } catch (error: any) {
    console.error('Erreur lors de la génération de l\'article:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors de la génération de l\'article' }, { status: 500 });
  }
} 