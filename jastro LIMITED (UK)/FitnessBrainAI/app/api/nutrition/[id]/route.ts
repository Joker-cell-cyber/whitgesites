import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { createClient } from '@/app/lib/supabase/server';
import { TEST_USER_ID } from '@/app/lib/constants';

// Définir correctement le type des paramètres pour éviter les erreurs de typage
type RouteParams = {
  params: {
    id: string
  }
}

// Récupérer un plan nutritionnel spécifique
export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || TEST_USER_ID;
    const planId = context.params.id;
    
    // Initialiser le client Supabase
    const supabase = createClient();
    
    // Récupérer le plan nutritionnel spécifique
    const { data, error } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('id', planId)
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Plan nutritionnel non trouvé' }, { status: 404 });
      }
      console.error('Erreur Supabase:', error);
      return NextResponse.json({ error: 'Erreur lors de la récupération du plan' }, { status: 500 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Plan nutritionnel non trouvé' }, { status: 404 });
    }
    
    // Transformer les données pour correspondre à notre type NutritionProgram
    let nutritionPlan;
    try {
      // Analyser les données JSON stockées dans la colonne 'data'
      const planData = typeof data.data === 'string' 
        ? JSON.parse(data.data) 
        : data.data;
      
      nutritionPlan = {
        ...planData,
        userId: data.user_id,
        createdAt: data.created_at
      };
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      return NextResponse.json({ error: 'Erreur lors du traitement des données' }, { status: 500 });
    }
    
    return NextResponse.json({ nutritionPlan });
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération du plan:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}

// Supprimer un plan nutritionnel
export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || TEST_USER_ID;
    const planId = context.params.id;
    
    // Initialiser le client Supabase
    const supabase = createClient();
    
    // Vérifier que le plan appartient bien à l'utilisateur
    const { data: planData, error: checkError } = await supabase
      .from('nutrition_plans')
      .select('id')
      .eq('id', planId)
      .eq('user_id', userId)
      .single();
    
    if (checkError || !planData) {
      return NextResponse.json({ 
        error: 'Plan nutritionnel non trouvé ou vous n\'êtes pas autorisé à le supprimer' 
      }, { status: 404 });
    }
    
    // Supprimer le plan
    const { error: deleteError } = await supabase
      .from('nutrition_plans')
      .delete()
      .eq('id', planId)
      .eq('user_id', userId);
    
    if (deleteError) {
      console.error('Erreur lors de la suppression:', deleteError);
      return NextResponse.json({ error: 'Erreur lors de la suppression du plan' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Plan nutritionnel supprimé avec succès' 
    });
    
  } catch (error: any) {
    console.error('Erreur lors de la suppression du plan:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
} 